'use client';

import { useState, useEffect } from 'react';
import { toBn } from '@/data/menuData';

export interface OpeningStatus {
  isOpen: boolean;
  closingSoon: boolean;
  statusBadgeText: string;
  statusBadgeType: 'open' | 'soon' | 'closed';
  hoursText: string;
  isReady: boolean;
}

const HOURS = { enabled: true, open: '10:00', close: '22:00', closedDays: [] as number[] };
const DAYS_BN = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];

function bnTime(t: string): string {
  const [h, m] = t.split(':').map(Number);
  const per = h < 4 ? 'রাত' : h < 6 ? 'ভোর' : h < 12 ? 'সকাল' : h < 15 ? 'দুপুর' : h < 18 ? 'বিকাল' : h < 20 ? 'সন্ধ্যা' : 'রাত';
  return `${per} ${toBn(h % 12 || 12)}:${toBn(String(m).padStart(2, '0'))}`;
}

function getDhakaNow() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Dhaka',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
  }).formatToParts(new Date());

  const g = (type: string) => parts.find(x => x.type === type)?.value || '0';
  const hour = parseInt(g('hour'), 10) % 24;
  const minute = parseInt(g('minute'), 10);
  const weekday = g('weekday');
  const dayIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(weekday);

  return {
    mins: hour * 60 + minute,
    day: dayIndex >= 0 ? dayIndex : 0,
  };
}

export function useOpeningHours(): OpeningStatus {
  const [status, setStatus] = useState<OpeningStatus>({
    isOpen: false,
    closingSoon: false,
    statusBadgeText: '',
    statusBadgeType: 'closed',
    hoursText: '',
    isReady: false,
  });

  useEffect(() => {
    function computeStatus(): OpeningStatus {
      if (!HOURS.enabled) {
        return {
          isOpen: false,
          closingSoon: false,
          statusBadgeText: '',
          statusBadgeType: 'closed',
          hoursText: '',
          isReady: true,
        };
      }

      const toMin = (t: string) => {
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
      };

      const o = toMin(HOURS.open);
      const c = toMin(HOURS.close);
      const { mins, day } = getDhakaNow();
      const closedToday = HOURS.closedDays.includes(day);
      const closedPrev = HOURS.closedDays.includes((day + 6) % 7);
      const overnight = c <= o;
      const isOpen = overnight
        ? (mins >= o && !closedToday) || (mins < c && !closedPrev)
        : !closedToday && mins >= o && mins < c;
      const untilClose = overnight && mins >= o ? c + 1440 - mins : c - mins;

      let statusBadgeText = '';
      let statusBadgeType: 'open' | 'soon' | 'closed' = 'closed';
      let closingSoon = false;

      if (isOpen && untilClose <= 30) {
        statusBadgeText = `শীঘ্রই বন্ধ হবে · ${bnTime(HOURS.close)} পর্যন্ত`;
        statusBadgeType = 'soon';
        closingSoon = true;
      } else if (isOpen) {
        statusBadgeText = `এখন খোলা · ${bnTime(HOURS.close)} পর্যন্ত`;
        statusBadgeType = 'open';
      } else if (closedToday) {
        statusBadgeText = `আজ বন্ধ`;
        statusBadgeType = 'closed';
      } else {
        statusBadgeText = `এখন বন্ধ · ${bnTime(HOURS.open)}-এ খুলবে`;
        statusBadgeType = 'closed';
      }

      const hoursText = `🕒 খোলা: ${bnTime(HOURS.open)} – ${bnTime(HOURS.close)}` +
        (HOURS.closedDays.length ? ` · সাপ্তাহিক বন্ধ: ${HOURS.closedDays.map(d => DAYS_BN[d]).join(', ')}` : '');

      return {
        isOpen,
        closingSoon,
        statusBadgeText,
        statusBadgeType,
        hoursText,
        isReady: true,
      };
    }

    setStatus(computeStatus());
    const interval = setInterval(() => {
      setStatus(computeStatus());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return status;
}

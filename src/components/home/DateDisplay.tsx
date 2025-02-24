'use client';

import React from 'react';

interface DateDisplayProps {
  startDate: string;
  endDate: string;
}
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 0부터 시작하므로 +1
  const day = date.getDate();
  // 예: 2025.4.21
  return `${year}.${month}.${day}`;
}

export default function DateDisplay ({ startDate, endDate }: DateDisplayProps) {
  return (
    <p className="text-sm text-gray-500 pt-3">
      {`${formatDate(startDate)} - ${formatDate(endDate)}`}
    </p>
  );
}

'use client';

import { useEffect } from 'react';

function page() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/moims?page=1');
      const data = await response.json();
      console.log(data);
    };
    fetchData();
  }, []);

  return <div>page</div>;
}

export default page;

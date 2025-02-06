'use client';

function page() {
  return (
    <div>
      <button
        onClick={async () => {
          const response = await fetch('/api/auth/recover-password', {
            method: 'POST',
            body: JSON.stringify({ password: '1234test!' }),
          });
          const data = await response.json();
          console.log(data);
        }}
      >
        바꾸기
      </button>
    </div>
  );
}

export default page;

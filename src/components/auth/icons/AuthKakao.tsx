interface AuthKakaoProps {
  className?: string;
}

export default function AuthKakao({ className }: AuthKakaoProps) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.902"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 1C4.81333 1 1 4.36533 1 7.21244C1 9.34578 2.38489 11.2276 4.49422 12.3458L3.60711 15.6044C3.528 15.8933 3.856 16.1227 4.10756 15.9564L7.99822 13.3742C8.32622 13.4062 8.66044 13.4249 9 13.4249C13.4178 13.4249 17 10.6436 17 7.21244C17 4.36533 13.4178 1 9 1Z"
        fill="#181600"
      />
    </svg>
  );
}

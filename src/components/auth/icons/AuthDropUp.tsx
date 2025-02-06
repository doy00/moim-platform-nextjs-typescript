interface AuthDropUpProps {
  className?: string;
}

function AuthDropUp({ className }: AuthDropUpProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12.7151 8.5347C12.3975 8.23461 11.9008 8.23461 11.5832 8.5347L5.8047 13.994C5.26275 14.506 5.6251 15.4171 6.37066 15.4171L17.9276 15.4171C18.6732 15.4171 19.0355 14.506 18.4936 13.994L12.7151 8.5347Z"
        fill="#C1BDB8"
      />
    </svg>
  );
}

export default AuthDropUp;

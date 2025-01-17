interface AuthDropDownProps {
  className?: string;
}

function AuthDropDown({ className }: AuthDropDownProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10.7151 13.4653C10.3975 13.7654 9.90085 13.7654 9.58321 13.4653L3.8047 8.00605C3.26275 7.49404 3.6251 6.58286 4.37066 6.58286L15.9276 6.58286C16.6732 6.58286 17.0355 7.49404 16.4936 8.00604L10.7151 13.4653Z"
        fill="#C1BDB8"
      />
    </svg>
  );
}

export default AuthDropDown;

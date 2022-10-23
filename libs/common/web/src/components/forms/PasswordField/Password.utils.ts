export const securityConstraints = [
  { label: '1 uppercase', regex: /(?=.*[A-Z])/ },
  { label: '1 lowercase', regex: /(?=.*[a-z])/ },
  { label: '1 number', regex: /(?=.*[0-9])/ },
  { label: '1 special character', regex: /(?=.*[!@#$%^&*])/ },
  { label: '8 characters', regex: /(?=.{8,})/ },
];

export const getGreeting = () => {
  const d = new Date();
  const currentTime: number = d.getHours();
  let greeting: string;
  if (currentTime > 18 && currentTime <= 23) {
    greeting = "Good evening!";
  } else if (currentTime >= 5 && currentTime <= 12) {
    greeting = "Good morning!";
  } else if (currentTime > 12 && currentTime <= 18) {
    greeting = "Good afternoon!";
  } else {
    greeting = "What a great time to see you!";
  }
  return greeting;
};

class CountDown
{
  constructor(expiredDate, onRender, onComplete)
  {
    this.setExpiredDate(expiredDate);

    this.onRender = onRender;
    this.onComplete = onComplete;
  }

  setExpiredDate(expiredDate)
  {
    // get the current time
    const currentTime = new Date().getTime();

    // calculate the remaining time
    this.timeRemaining = expiredDate.getTime() - currentTime;

    if (this.timeRemaining <= 0)
    {
      this.complete();
    }
    else
    {
      this.start();
    }
  }

  complete()
  {
    if (typeof this.onComplete === 'function')
    {
      this.onComplete();
    }
  }
  getTime()
  {
    return {
      days: Math.floor(this.timeRemaining / 1000 / 60 / 60 / 24),
      hours: Math.floor(this.timeRemaining / 1000 / 60 / 60) % 24,
      minutes: Math.floor(this.timeRemaining / 1000 / 60) % 60,
      seconds: Math.floor(this.timeRemaining / 1000) % 60,
    };
  }

  update()
  {
    if (typeof this.onRender === 'function')
    {
      this.onRender(this.getTime());
    }
  }

  start()
  {
    // update the countdown
    this.update();

    //  setup a timer
    const intervalId = setInterval(() =>
    {
      // update the timer
      this.timeRemaining -= 1000;

      if (this.timeRemaining < 0)
      {
        // call the callback
        this.complete();

        // clear the interval if expired
        clearInterval(intervalId);
      }
      else
      {
        this.update();
      }
    }, 1000);
  }
}

// update the year element
function getNewYear()
{
  const currentYear = new Date().getFullYear();
  return new Date(`January 01 ${currentYear + 1} 00:00:00`);
}

const year = document.querySelector('.year');
year.innerHTML = `Keep watching Nyan cat until ${getNewYear().getFullYear()} :D`;

// select elements
const app = document.querySelector('.countdown-timer');
const message = document.querySelector('.message');
const heading = document.querySelector('h1');

const format = (t) => t < 10 ? '0' + t : t;

const render = (time) =>
{
  app.innerHTML = `
        <div class="count-down">
            <div class="timer">
                <h2 class="days">${format(time.days)}</h2>
                <small>Days</small>
            </div>
            <div class="timer">
                <h2 class="hours">${format(time.hours)}</h2>
                <small>Hours</small>
            </div>
            <div class="timer">
                <h2 class="minutes">${format(time.minutes)}</h2>
                <small>Minutes</small>
            </div>
            <div class="timer">
                <h2 class="seconds">${format(time.seconds)}</h2>
                <small>Seconds</small>
            </div>
        </div>
        `;
};

const hideMessage = () =>
{
  message.innerHTML = '';
  heading.style.display = 'block';
};

const countdownTimer = new CountDown(
  getNewYear(),
  render,
  () =>
  {
    // restart the countdown after showing the
  // greeting message for a day ()
    setTimeout(() =>
    {
      hideMessage();
      countdownTimer.setExpiredDate(getNewYear());
    }, 1000 * 60 * 60 * 24);
  },
);

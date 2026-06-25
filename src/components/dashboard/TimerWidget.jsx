import { useEffect, useRef, useState } from 'react';

const initialTime = {
  hours: 5,
  minutes: 8,
  seconds: 56,
};

const toSeconds = ({ hours, minutes, seconds }) => hours * 3600 + minutes * 60 + seconds;
const formatTime = (value) => value.toString().padStart(2, '0');

const TimerWidget = () => {
  const [time, setTime] = useState(initialTime);
  const [totalSeconds, setTotalSeconds] = useState(toSeconds(initialTime));
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isRunning) {
      setTotalSeconds(toSeconds(time));
    }
  }, [time]);

  useEffect(() => {
    if (!isRunning) return undefined;

    intervalRef.current = setInterval(() => {
      setTotalSeconds((previous) => {
        if (previous <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          alert('Timer finished!');
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const displayTime = {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };

  const updateTime = (field, direction) => {
    const max = field === 'hours' ? 23 : 59;

    setTime((current) => ({
      ...current,
      [field]: Math.min(max, Math.max(0, current[field] + direction)),
    }));
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(initialTime);
    setTotalSeconds(toSeconds(initialTime));
  };

  const stepperValue = (field) => (isRunning ? displayTime[field] : time[field]);

  const TimerStepper = ({ label, field }) => (
    <div className="flex flex-col items-center gap-1">
      <p className="mb-1 text-[10px] text-white/45">{label}</p>
      <button
        type="button"
        onClick={() => updateTime(field, 1)}
        disabled={isRunning}
        className="text-sm leading-none text-white/65 transition hover:text-white disabled:opacity-30"
      >
        ▲
      </button>
      <p className="w-12 text-center text-2xl font-light tabular-nums text-white">{formatTime(stepperValue(field))}</p>
      <button
        type="button"
        onClick={() => updateTime(field, -1)}
        disabled={isRunning}
        className="text-sm leading-none text-white/65 transition hover:text-white disabled:opacity-30"
      >
        ▼
      </button>
    </div>
  );

  return (
    <div className="app-panel grid gap-5 bg-[#1E234B] p-5 sm:grid-cols-[138px_1fr] sm:items-center">
      <div className="mx-auto flex h-[122px] w-[122px] items-center justify-center rounded-full border-[7px] border-[#FF6B6B] bg-[#191E40] shadow-[inset_0_0_0_10px_rgba(0,0,0,0.18)]">
        <span className="text-lg font-bold tabular-nums text-white">
          {formatTime(displayTime.hours)}:{formatTime(displayTime.minutes)}:{formatTime(displayTime.seconds)}
        </span>
      </div>

      <div className="min-w-0">
        <div className="mb-4 grid grid-cols-3 items-center gap-2">
          <TimerStepper label="Hours" field="hours" />
          <TimerStepper label="Minutes" field="minutes" />
          <TimerStepper label="Seconds" field="seconds" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setIsRunning((current) => !current)}
            disabled={totalSeconds === 0}
            className="rounded-lg bg-[#FF6B6B] py-2 text-sm font-medium text-white transition hover:bg-[#ff5858] disabled:cursor-not-allowed disabled:opacity-45"
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg bg-white/10 py-2 text-sm font-medium text-white transition hover:bg-white/15"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerWidget;

import { intervalToDuration } from "date-fns/esm";
import styles from "./CounterLink.module.css";

interface CounterLinkProps {
    hostname: string;
    minutes: number;
    maxMinutes: number;
}

const CounterLink = ({ hostname, minutes, maxMinutes }: CounterLinkProps) => {
    const duration = intervalToDuration({ start: 0, end: minutes * 60 * 1000 });

    return (
        <div className={styles.wrapper}>
            <div className={styles.imageWrapper}>
                <img
                    className={styles.image}
                    src={`https://www.google.com/s2/favicons?domain=${hostname}&sz=32`}
                />
            </div>
            <div className={styles.infoWrapper}>
                <span className={styles.infoWrapper__hostname}>{hostname}</span>
                <div className={styles.barWrapper}>
                    <div
                        className={styles.barWrapper__bar}
                        style={{
                            width: `${(minutes / maxMinutes) * 100}%`,
                        }}
                    ></div>
                    <span className={styles.barWrapper__time}>
                        {duration.hours !== 0 && `${duration.hours}h`}{" "}
                        {duration.minutes !== 0 && `${duration.minutes}m`}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CounterLink;

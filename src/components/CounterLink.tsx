interface CounterLinkProps {
    hostname: string;
    minutes: number;
    maxMinutes: number;
}

// "youtube.com": [1, 10] // (Label, 10 minutes spent)

const CounterLink = ({ hostname, minutes }: CounterLinkProps) => {
    return (
        <div>
            <img />
            <div>
                <p>{hostname}</p>
                <p>{minutes}</p>
            </div>
        </div>
    );
};

export default CounterLink;

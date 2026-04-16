"use client";

type IconProps = { className?: string };

export function MailIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 6.5h16v11H4z" />
            <path d="M4.5 7l7.5 6 7.5-6" />
        </svg>
    );
}

export function LockIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 11V8.8C7 6.15 9.2 4 12 4s5 2.15 5 4.8V11" />
            <path d="M6.5 11h11v9h-11z" />
            <path d="M12 15v2.5" />
        </svg>
    );
}

export function UserIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 12.2c2.3 0 4.2-1.9 4.2-4.2S14.3 3.8 12 3.8 7.8 5.7 7.8 8s1.9 4.2 4.2 4.2Z" />
            <path d="M4.8 20.2c1.6-3.2 4.2-4.8 7.2-4.8s5.6 1.6 7.2 4.8" />
        </svg>
    );
}

export function CheckIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 7.5 10.5 17 4 10.5" />
        </svg>
    );
}

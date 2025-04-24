"use client"
import LandingLayout from "../landing-layout/layout";
import React, { useRef, useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

export default function Page() {
    const ref = useRef<HTMLFormElement>(null);
    const captchaRef = useRef<HCaptcha | null>(null);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);

    const onCaptchaChange = (token: string) => setCaptchaToken(token);
    const onCaptchaExpire = () => setCaptchaToken(null);

    // Form submission logic here...
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (ref.current) {
            const formData = new FormData(ref.current);
            formData.append('captcha', captchaToken || ''); // Handle null token by using empty string as fallback
            // Proceed to send formData to your backend
        }
    };
    return (
        <LandingLayout>
            <div className="container">
                <form ref={ref} onSubmit={handleFormSubmit}>
                    {/* Your form fields go here */}

                    <HCaptcha
                        sitekey="bb18a7e6-0478-4bb4-bbcc-6cf814367412"
                        onVerify={onCaptchaChange}
                        ref={captchaRef}
                        onExpire={onCaptchaExpire}
                    />

                    <button type="submit">Submit Form</button>
                </form>
            </div>
        </LandingLayout>
    );
}
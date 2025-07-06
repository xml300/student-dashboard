"use client";
import React, { useState } from "react";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

// Mock components (assuming these are in your project)
const PageHeading = ({ title, description }: { title: string; description: string }) => (
  <div className="mb-6">
    <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
    <p className="text-foreground/80">{description}</p>
  </div>
);

const ActionButton = ({
    label,
    variant,
    onClick,
    className,
    size,
    icon
}: {
    label: string;
    variant: "primary" | "secondary" | "danger";
    onClick?: () => void;
    className?: string;
    size?: 'small' | 'medium';
    icon?: React.ReactNode;
}) => {
    let baseClasses = "px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-medium text-sm inline-flex items-center";
    if (className) {
        baseClasses += " " + className;
    }
    const sizeClasses = size === 'small' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm';
    let variantClasses = '';
    if (variant === "primary") {
        variantClasses = "text-white shadow-sm bg-primary-accent hover:bg-primary-accent/90";
    } else if (variant === "secondary") {
        variantClasses = "text-foreground bg-card-background border border-border-color shadow-sm hover:bg-foreground/5";
    } else if (variant === "danger") {
        variantClasses = "text-white bg-red-500 hover:bg-red-600 focus:ring-red-500";
    }

    return (
        <button
            onClick={onClick}
            className={baseClasses + " " + variantClasses + " " + sizeClasses}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {label}
        </button>
    );
};

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}) => {
  let baseClasses = "block w-full px-4 py-2 border border-border-color rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-background text-foreground";
  if (className) {
    baseClasses += " " + className;
  }
  return (
    <div>
      <label className="block text-sm font-medium text-foreground/80 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={baseClasses}
      />
    </div>
  );
};

export default function SettingsPage() {
    const [siteName, setSiteName] = useState("My Site"); // Example initial value
    const [primaryColor, setPrimaryColor] = useState("#4F46E5");  // Example initial value
    const [logo, setLogo] = useState<string | null>(null);

    const handleSiteNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSiteName(e.target.value);
    };

    const handlePrimaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrimaryColor(e.currentTarget.value);
    };

      const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setLogo(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        } else {
            setLogo(null); // Reset logo if no file selected
        }
    };

    const handleSaveSettings = () => {
      // In a real application, you would send this data to a server
      console.log('Saving settings:', {
        siteName,
        primaryColor,
        logo,
      });
      // You might also want to show a success message to the user
    };

    return (
        <section className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
          <PageHeading title="Settings" description="Customize your dashboard settings" />
          <div className="bg-card-background shadow-md rounded-md p-6 sm:p-8 md:p-10">
            <div className="space-y-8">
              <div>
                <InputField
                  label="Site Name"
                  value={siteName}
                  onChange={handleSiteNameChange}
                  placeholder="Enter site name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Primary Color</label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={handlePrimaryColorChange}
                    className="w-12 h-12 rounded-full cursor-pointer border-none shadow-sm bg-background"
                  />
                  <span className='text-foreground/80 font-medium'>Current Primary Color: <span className="font-bold" style={{color: primaryColor}}> {primaryColor}</span></span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="mb-2 bg-background text-foreground"
                />
                {logo && (
                  <div className="mt-2">
                    <Image src={logo} alt="Logo Preview" width={48} height={48} className="h-12 w-auto" />
                  </div>
                )}
                <p className="text-foreground/80 text-sm mt-1">Upload a logo for your dashboard (Recommended size: 100x100 pixels).</p>
              </div>
            </div>
            <div className="mt-10 pt-6 border-t border-border-color flex justify-end">
              <ActionButton
                onClick={handleSaveSettings}
                label="Save Settings"
                icon={<FontAwesomeIcon icon={faGear} className="w-4 h-4" />}
                variant="primary"
                className="w-full sm:w-auto"
              />
            </div>
          </div>
        </section>
    );
}

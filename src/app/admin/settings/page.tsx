"use client";

import { useState } from "react";
import Image from "next/image";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import PageHeading from "@/components/PageHeading";
import InputField from "@/components/InputField";
import ActionButton from "@/components/ActionButton";

export default function SettingsPage() {
    const [siteName, setSiteName] = useState("My Site"); 
    const [primaryColor, setPrimaryColor] = useState("#4F46E5");  
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
            setLogo(null); 
        }
    };

    const handleSaveSettings = () => {
      
      console.log('Saving settings:', {
        siteName,
        primaryColor,
        logo,
      });
      
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
                icon={<Cog6ToothIcon className="w-4 h-4" />}
                variant="primary"
                className="w-full sm:w-auto"
              />
            </div>
          </div>
        </section>
    );
}

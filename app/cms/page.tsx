import Main from "@/app/components/Main";
import React from "react";

export default function CMSPage() {
    return (
        <Main>
            <div className="cms-content p-6">
                <h1 className="text-3xl font-bold mb-4 text-blue-800">CMS Dashboard</h1>
                <p className="text-lg text-gray-700">Welcome to the admin area. Select an option from the sidebar to
                    manage your site.</p>
            </div>
        </Main>
    );
}

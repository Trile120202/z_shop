import React from 'react';

const Layout = ({
                    children,
                }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="flex">
            <div className="flex-1">
                <div className={'h-[60px]  bg-gray-800 text-white'}></div>
                <div className={'p-6'}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;

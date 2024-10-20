'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaPlus, FaSearch } from 'react-icons/fa';

const Page = () => {
    const [searchKeyword, setSearchKeyword] = useState<string>('');

    const images = [
        { id: 1, url: 'https://via.placeholder.com/150', name: 'Image 1' },
        { id: 2, url: 'https://via.placeholder.com/150', name: 'Image 2' },
        { id: 3, url: 'https://via.placeholder.com/150', name: 'Image 3' },
        { id: 4, url: 'https://via.placeholder.com/150', name: 'Image 4' },
        { id: 5, url: 'https://via.placeholder.com/150', name: 'Image 5' },
        { id: 6, url: 'https://via.placeholder.com/150', name: 'Image 6' },
    ];

    const handleUpload = () => {
        console.log('Upload new image');
    };

    return (
        <Card className="w-full shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-bold">Quản lý Media</CardTitle>
                    <Button onClick={handleUpload} className="bg-green-500 hover:bg-green-600 transition duration-300">
                        <FaPlus className="mr-2 h-4 w-4" />
                        Tải lên
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="mb-6">
                    <div className="relative w-64">
                        <Input
                            placeholder="Tìm kiếm hình ảnh"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {images.map((image) => (
                        <div key={image.id} className="relative group">
                            <img src={image.url} alt={image.name} className="w-full h-auto rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                                <p className="text-white text-sm">{image.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default Page;
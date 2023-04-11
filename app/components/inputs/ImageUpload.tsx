'use client';
// Import các module được sử dụng
import React, { useCallback } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { TbPhotoPlus } from 'react-icons/tb';

// Khai báo biến toàn cục cloudinary
declare global {
   var cloudinary: any;
}

// Khai báo kiểu dữ liệu cho props của component
interface ImageUploadProps {
   value: string;
   onChange: (value: string) => void;
}

// Khai báo component ImageUpload
const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
   // Hàm callback xử lý khi upload ảnh thành công
   const handleUpload = useCallback(
      (result: any) => {
         onChange(result.info.secure_url);
      },
      [onChange],
   );

   // JSX render component ImageUpload
   return (
      <CldUploadWidget
         uploadPreset="v57xvv1l"
         options={{
            maxFiles: 1,
         }}
         onUpload={handleUpload}
      >
         {({ open }) => {
            return (
               <div
                  onClick={() => open?.()}
                  className="relative cursor-pointer hover:opacity-70 border-dashed 
                  border-2 p-20 border-neutral-300 transition flex flex-col items-center justify-center gap-4 text-neutral-600"
               >
                  <TbPhotoPlus size={50} />
                  <div className="font-semibold text-lg">Click to upload</div>
                  {/* Hiển thị ảnh đã upload lên */}
                  {value && (
                     <div className="absolute inset-0 w-full h-full">
                        <Image
                           alt="upload"
                           fill
                           style={{ objectFit: 'cover' }}
                           src={value}
                        />
                     </div>
                  )}
               </div>
            );
         }}
      </CldUploadWidget>
   );
};

// Xuất component ImageUpload
export default ImageUpload;

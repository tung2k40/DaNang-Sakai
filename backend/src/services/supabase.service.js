const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const uploadFileToSupabase = async (fileBuffer, originalName, mimeType) => {
    try {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(originalName);
        const fileName = `${uniqueSuffix}${ext}`;
        
        // Cần truyền bucket name (Bạn đã tạo bucket public tên là danang-sakai)
        const bucketName = 'danang-sakai';

        const { data, error } = await supabase
            .storage
            .from(bucketName)
            .upload(fileName, fileBuffer, {
                contentType: mimeType,
                upsert: false
            });

        if (error) {
            console.error("Supabase API error:", error);
            throw error;
        }

        // Tạo public url
        const { data: publicUrlData } = supabase
            .storage
            .from(bucketName)
            .getPublicUrl(fileName);

        return publicUrlData.publicUrl;
    } catch (error) {
        console.error("Supabase upload error:", error);
        throw new Error('Lỗi khi tải file lên hệ thống Supabase');
    }
};

module.exports = { supabase, uploadFileToSupabase };

import axios from 'axios';

export function useDownload(pdfUrl: string, p0: string) {
    const downloadPdf = async (url: string, filename: string = 'file.pdf') => {
        try {
            const response = await axios.get(url, {
                responseType: 'blob', // ✅ Get binary data
            });

            // ✅ Create a Blob from the response
            const blob = new Blob([response.data], { type: 'application/pdf' });

            // ✅ Create a URL for the Blob
            const blobUrl = window.URL.createObjectURL(blob);

            // ✅ Create a link and trigger download
            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();

            // ✅ Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Error downloading the PDF:', error);
        }
    };

    return {
        downloadPdf,
    };
}

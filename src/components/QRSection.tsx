import { QRCodeSVG } from 'qrcode.react';
import { Scan } from 'lucide-react';

export default function QRSection() {
  const currentUrl = window.location.origin;
  
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/60 transition-all hover:shadow-xl">
      <div className="flex items-center gap-2 mb-6 text-[#0f172a]">
        <Scan className="w-5 h-5" />
        <h3 className="font-bold text-sm uppercase tracking-wider">Scan for Digital Judging Access</h3>
      </div>
      <div className="p-4 bg-white rounded-xl shadow-inner border border-slate-100 mb-4">
        <QRCodeSVG value={currentUrl} size={180} level="H" includeMargin={true} fgColor="#0f172a" />
      </div>
      <p className="text-xs text-slate-500 text-center max-w-[200px] font-medium">
        Point your mobile camera at the code to securely access the platform.
      </p>
    </div>
  );
}

import { useState } from "react";
import { X, Phone, ShieldCheck } from "lucide-react";

export default function SignInModal({ onClose }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [step, setStep] = useState("phone");
  const [message, setMessage] = useState("");

  const handleGetOtp = () => {
    if (!/^[0-9]{10}$/.test(phone)) {
      setMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

    setGeneratedOtp(newOtp);
    setStep("otp");
    setMessage("");

    // Demo only — shows OTP in browser console
    console.log("Your demo OTP is:", newOtp);

    alert(`Demo OTP: ${newOtp}`);
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      setStep("success");
      setMessage("");
    } else {
      setMessage("Incorrect OTP. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-slate-500 hover:bg-slate-100"
        >
          <X size={20} />
        </button>

        {step === "phone" && (
          <>
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
              <Phone size={24} />
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              Sign in to EDUAI
            </h2>

            <p className="mt-2 text-slate-500">
              Enter your mobile number to receive an OTP.
            </p>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Mobile Number
              </label>

              <div className="flex overflow-hidden rounded-xl border border-slate-300 focus-within:border-indigo-500">
                <span className="flex items-center bg-slate-50 px-4 text-slate-600">
                  +91
                </span>

                <input
                  type="tel"
                  maxLength="10"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Enter 10-digit number"
                  className="w-full px-4 py-3 outline-none"
                />
              </div>
            </div>

            {message && (
              <p className="mt-3 text-sm text-red-500">{message}</p>
            )}

            <button
              onClick={handleGetOtp}
              className="mt-6 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              Get OTP
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
              <ShieldCheck size={24} />
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              Verify OTP
            </h2>

            <p className="mt-2 text-slate-500">
              Enter the 6-digit OTP sent to +91 {phone}
            </p>

            <input
              type="text"
              maxLength="6"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ""))
              }
              placeholder="Enter OTP"
              className="mt-6 w-full rounded-xl border border-slate-300 px-4 py-3 text-center text-xl tracking-[0.4em] outline-none focus:border-indigo-500"
            />

            {message && (
              <p className="mt-3 text-sm text-red-500">{message}</p>
            )}

            <button
              onClick={handleVerifyOtp}
              className="mt-6 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              Verify OTP
            </button>

            <button
              onClick={() => {
                setStep("phone");
                setOtp("");
                setMessage("");
              }}
              className="mt-3 w-full py-2 text-sm font-medium text-indigo-600"
            >
              Change mobile number
            </button>
          </>
        )}

        {step === "success" && (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <ShieldCheck size={32} />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-slate-900">
              Successfully Signed In! 🎉
            </h2>

            <p className="mt-2 text-slate-500">
              Welcome to EDUAI. You can now build your personalized learning plan.
            </p>

            <button
              onClick={onClose}
              className="mt-6 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white"
            >
              Continue Learning
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
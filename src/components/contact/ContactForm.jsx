import React, { useEffect, useState } from 'react';
import { ScrollReveal } from '../home/ScrollReveal';
import {
  ArrowUpRight,
  CheckCircle2,
  Crosshair,
  Factory,
  FileUp,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const API_BASE =
  import.meta.env.VITE_JOVA_API_URL || 'http://localhost:5001';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    requirement: '',
  });

  const [file, setFile] = useState(null);
  const [highlightUpload, setHighlightUpload] = useState(false);

  const [status, setStatus] = useState({
    state: 'idle',
    message: '',
  });

  useEffect(() => {
    const style = document.createElement('style');

    style.id = 'jova-contact-motion';

    style.innerHTML = `
      @keyframes jovaGridMove {
        0% {
          transform: translate3d(0, 0, 0);
        }
        100% {
          transform: translate3d(80px, 80px, 0);
        }
      }

      @keyframes jovaScan {
        0% {
          transform: translateX(-120%);
          opacity: 0;
        }
        15% {
          opacity: 1;
        }
        50% {
          opacity: 1;
        }
        100% {
          transform: translateX(120%);
          opacity: 0;
        }
      }

      @keyframes jovaRotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes jovaRotateReverse {
        from {
          transform: rotate(360deg);
        }
        to {
          transform: rotate(0deg);
        }
      }

      @keyframes jovaPulse {
        0%,
        100% {
          opacity: 0.25;
          transform: scale(0.95);
        }
        50% {
          opacity: 0.75;
          transform: scale(1.05);
        }
      }

      @keyframes jovaFloat {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-12px);
        }
      }

      @keyframes jovaBeam {
        0% {
          transform: translateX(-140%) rotate(18deg);
        }
        100% {
          transform: translateX(180%) rotate(18deg);
        }
      }

      .jova-grid-motion {
        animation: jovaGridMove 18s linear infinite;
      }

      .jova-scan {
        animation: jovaScan 6s ease-in-out infinite;
      }

      .jova-rotate {
        animation: jovaRotate 25s linear infinite;
      }

      .jova-rotate-reverse {
        animation: jovaRotateReverse 18s linear infinite;
      }

      .jova-pulse {
        animation: jovaPulse 4s ease-in-out infinite;
      }

      .jova-float {
        animation: jovaFloat 5s ease-in-out infinite;
      }

      .jova-beam {
        animation: jovaBeam 8s ease-in-out infinite;
      }
    `;

    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, []);

  // "Start a Project Enquiry" / "Upload Drawings" buttons (Hero, audience strip)
  // and deep links like /contact#drawing-dropzone land here.
  useEffect(() => {
    let flashTimer;
    const arrive = (mode) => {
      if (mode === 'upload') {
        setHighlightUpload(true);
        clearTimeout(flashTimer);
        flashTimer = setTimeout(() => setHighlightUpload(false), 2800);
      } else {
        document.getElementById('name')?.focus({ preventScroll: true });
      }
    };
    const onEnquiry = (e) => arrive(e.detail?.mode);
    window.addEventListener('jova-enquiry', onEnquiry);

    const hash = window.location.hash.replace('#', '');
    let hashTimer;
    if (hash === 'drawing-dropzone' || hash === 'enquiry-form') {
      hashTimer = setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        arrive(hash === 'drawing-dropzone' ? 'upload' : 'enquiry');
      }, 600);
    }

    return () => {
      window.removeEventListener('jova-enquiry', onEnquiry);
      clearTimeout(flashTimer);
      clearTimeout(hashTimer);
    };
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({
      state: 'loading',
      message: '',
    });

    try {
      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });

      if (file) {
        payload.append('drawing', file);
      }

      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        body: payload,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Something went wrong.');
      }

      setStatus({
        state: 'success',
        message: "Thanks! We'll be in touch shortly.",
      });

      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        requirement: '',
      });

      setFile(null);
    } catch (err) {
      setStatus({
        state: 'error',
        message: err.message || 'Failed to send message.',
      });
    }
  };

  return (
    <section
      id="contact-form"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#050607]
        text-white
        py-24
        md:py-32
        px-4
        md:px-8
      "
    >
      {/* =====================================================
          CINEMATIC BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(255,107,0,0.16),transparent_30%),radial-gradient(circle_at_10%_85%,rgba(212,175,55,0.08),transparent_30%),linear-gradient(120deg,#030405,#0a0b0d,#030405)]" />

        {/* Orange cinematic glow */}
        <div
          className="
            absolute
            -top-40
            right-[-10%]
            w-[650px]
            h-[650px]
            rounded-full
            bg-orange-600/15
            blur-[150px]
            jova-pulse
          "
        />

        {/* Gold glow */}
        <div
          className="
            absolute
            bottom-[-20%]
            left-[-10%]
            w-[550px]
            h-[550px]
            rounded-full
            bg-yellow-600/10
            blur-[140px]
          "
        />

        {/* Moving technical grid */}
        <div
          className="
            absolute
            inset-[-200px]
            opacity-[0.09]
            jova-grid-motion
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,0.22) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,0.22) 1px,
                transparent 1px
              )
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Blueprint diagonal lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-[15%] top-0 h-full w-px bg-gradient-to-b from-transparent via-orange-500/30 to-transparent rotate-[18deg]" />
          <div className="absolute left-[30%] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent rotate-[18deg]" />
          <div className="absolute right-[25%] top-0 h-full w-px bg-gradient-to-b from-transparent via-orange-500/20 to-transparent rotate-[18deg]" />
        </div>

        {/* Horizontal scanning line */}
        <div
          className="
            absolute
            left-0
            top-[38%]
            w-full
            h-px
            bg-gradient-to-r
            from-transparent
            via-orange-500/50
            to-transparent
            jova-scan
          "
        />

        {/* Cinematic light beam */}
        <div
          className="
            absolute
            top-[-30%]
            left-[40%]
            w-[160px]
            h-[170%]
            bg-gradient-to-b
            from-transparent
            via-orange-500/10
            to-transparent
            blur-2xl
            rotate-[18deg]
            jova-beam
          "
        />

        {/* Vignette */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.8)_100%)]
          "
        />
      </div>

      {/* =====================================================
          TECHNICAL HUD TOP
      ====================================================== */}

      <div
        className="
          absolute
          top-0
          left-0
          right-0
          z-20
          border-b
          border-white/10
          bg-black/30
          backdrop-blur-md
        "
      >
        <div
          className="
            max-w-[1500px]
            mx-auto
            px-6
            md:px-10
            lg:px-16
            py-3
            flex
            items-center
            justify-between
          "
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
            </span>

            <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-white/50">
              JOVA / ENGINEERING SYSTEM
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-5 text-[8px] font-mono uppercase tracking-[0.3em] text-white/25">
            <span>CONTACT</span>
            <span className="text-orange-500/60">01—04</span>
            <span>LIVE</span>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="relative z-10 max-w-[1500px] mx-auto pt-8">
        {/* Heading */}
        <div className="text-center mb-16 md:mb-20">
          <ScrollReveal delay={0.1}>
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-12 h-px bg-gradient-to-r from-transparent to-orange-500" />

              <span className="text-orange-400 text-[10px] font-bold uppercase tracking-[0.4em]">
                Get In Touch
              </span>

              <span className="w-12 h-px bg-gradient-to-l from-transparent to-orange-500" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h2
              className="
                text-5xl
                md:text-6xl
                lg:text-8xl
                font-black
                uppercase
                tracking-[-0.06em]
                leading-[0.85]
              "
            >
              Turn Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-orange-500 to-orange-700">
                Vision
              </span>{' '}
              Into Metal.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="max-w-2xl mx-auto mt-7 text-sm md:text-base text-white/45 leading-relaxed">
              Send us your drawing, concept or project requirement.
              Our engineering team will connect the design,
              fabrication, finishing and installation process.
            </p>
          </ScrollReveal>
        </div>

        {/* =====================================================
            TWO COLUMN
        ====================================================== */}

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-stretch">
          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div className="flex flex-col gap-8">
            <ScrollReveal delay={0.3}>
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0d0f]/90 p-7 md:p-9">
                {/* corner lines */}
                <div className="absolute top-0 left-0 w-24 h-px bg-gradient-to-r from-orange-500 to-transparent" />
                <div className="absolute top-0 left-0 h-24 w-px bg-gradient-to-b from-orange-500 to-transparent" />

                <div className="absolute bottom-0 right-0 w-24 h-px bg-gradient-to-l from-orange-500/50 to-transparent" />
                <div className="absolute bottom-0 right-0 h-24 w-px bg-gradient-to-t from-orange-500/50 to-transparent" />

                <div className="flex items-center gap-3 mb-7">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                    <Factory
                      size={19}
                      className="text-orange-500"
                    />
                  </div>

                  <div>
                    <span className="block text-orange-400 text-[9px] uppercase tracking-[0.3em] font-bold">
                      Jova Metcraft
                    </span>

                    <h3 className="text-xl md:text-2xl font-bold mt-1">
                      Engineering Headquarters
                    </h3>
                  </div>
                </div>

                <p className="text-white/35 text-xs uppercase tracking-[0.2em] mb-7">
                  Hosur · Tamil Nadu · India
                </p>

                <div className="space-y-6">
                  {/* Address */}
                  <a
                    href="#google-map"
                    onClick={(e) => {
                      e.preventDefault();

                      const mapEl =
                        document.getElementById('google-map');

                      if (mapEl) {
                        mapEl.scrollIntoView({
                          behavior: 'smooth',
                          block: 'center',
                        });

                        mapEl.classList.add(
                          'ring-2',
                          'ring-orange-500'
                        );

                        setTimeout(() => {
                          mapEl.classList.remove(
                            'ring-2',
                            'ring-orange-500'
                          );
                        }, 1000);
                      }
                    }}
                    className="flex gap-4 group"
                  >
                    <div
                      className="
                        w-11
                        h-11
                        rounded-xl
                        shrink-0
                        border
                        border-white/10
                        bg-white/[0.03]
                        flex
                        items-center
                        justify-center
                        text-orange-500
                        group-hover:bg-orange-500/10
                        group-hover:border-orange-500/30
                        transition-all
                      "
                    >
                      <MapPin size={18} />
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-1 group-hover:text-orange-400 transition-colors">
                        Address
                      </h4>

                      <p className="text-sm text-white/45 leading-relaxed">
                        Sy. No.47/2A1B, 47/3A2,
                        <br />
                        Matham Agragaram, ESI Ring Road,
                        <br />
                        Mookandapalli Post,
                        <br />
                        HOSUR-635 126
                      </p>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+917397735106"
                    className="flex gap-4 group"
                  >
                    <div
                      className="
                        w-11
                        h-11
                        rounded-xl
                        shrink-0
                        border
                        border-white/10
                        bg-white/[0.03]
                        flex
                        items-center
                        justify-center
                        text-orange-500
                        group-hover:bg-orange-500/10
                        group-hover:border-orange-500/30
                        transition-all
                      "
                    >
                      <Phone size={18} />
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-1 group-hover:text-orange-400 transition-colors">
                        Phone
                      </h4>

                      <p className="text-sm text-white/45">
                        +91 7397735106
                      </p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:contact@jova.com"
                    className="flex gap-4 group"
                  >
                    <div
                      className="
                        w-11
                        h-11
                        rounded-xl
                        shrink-0
                        border
                        border-white/10
                        bg-white/[0.03]
                        flex
                        items-center
                        justify-center
                        text-orange-500
                        group-hover:bg-orange-500/10
                        group-hover:border-orange-500/30
                        transition-all
                      "
                    >
                      <Mail size={18} />
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-1 group-hover:text-orange-400 transition-colors">
                        Email
                      </h4>

                      <p className="text-sm text-white/45">
                        contact@jova.com
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* =================================================
                MAP
            ================================================== */}

            <ScrollReveal delay={0.4}>
              <div className="relative group rounded-[2rem] overflow-hidden border border-white/10 bg-[#090a0c] p-[2px]">
                {/* rotating glow */}
                <div
                  className="
                    absolute
                    -inset-[50%]
                    bg-[conic-gradient(from_0deg,transparent,rgba(255,107,0,0.7),transparent,rgba(212,175,55,0.4),transparent)]
                    jova-rotate
                    opacity-40
                  "
                />

                <div
                  id="google-map"
                  className="
                    relative
                    z-10
                    w-full
                    h-[320px]
                    md:h-[360px]
                    rounded-[calc(2rem-2px)]
                    overflow-hidden
                    bg-[#0a0b0d]
                    transition-all
                    duration-500
                  "
                >
                  {/* map overlay */}
                  <div className="absolute inset-0 z-20 pointer-events-none bg-[linear-gradient(rgba(255,107,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

                  <div className="absolute z-30 top-5 left-5 px-3 py-2 rounded-lg border border-white/10 bg-black/60 backdrop-blur-md">
                    <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-orange-400">
                      HQ / LOCATION
                    </span>
                  </div>

                  <iframe
                    title="Jova Metcraft location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.6177440888473!2d77.78912007515017!3d12.738341919949262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae71004d3c2af7%3A0xd663478bd01e130f!2sJOVA%20METCKAFT!5e0!3m2!1sen!2sus!4v1783577046430!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="
                      relative
                      z-10
                      w-full
                      h-full
                      grayscale
                      opacity-60
                      group-hover:grayscale-0
                      group-hover:opacity-100
                      transition-all
                      duration-1000
                    "
                  />

                  {/* scan line */}
                  <div className="absolute z-30 left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-orange-500/70 to-transparent pointer-events-none jova-scan" />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* =================================================
              RIGHT FORM
          ================================================== */}

          <div className="relative">
            {/* ambient glows */}
            <div className="absolute -top-10 right-10 w-72 h-72 bg-orange-500/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="absolute bottom-0 left-0 w-60 h-60 bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none" />

            <ScrollReveal delay={0.4} className="h-full">
              <div
                className="
                  relative
                  h-full
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-white/15
                  bg-[#0b0d10]/95
                  shadow-[0_30px_100px_rgba(0,0,0,0.55)]
                  p-7
                  md:p-10
                "
              >
                {/* animated border */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

                  <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-orange-500/60 via-transparent to-transparent" />
                </div>

                {/* decorative circles */}
                <div className="absolute -right-24 -top-24 w-64 h-64 rounded-full border border-orange-500/10 jova-rotate" />

                <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full border border-dashed border-orange-500/20 jova-rotate-reverse" />

                {/* form header */}
                <div className="relative z-10 flex items-start justify-between gap-5 mb-10">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles
                        size={15}
                        className="text-orange-500"
                      />

                      <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-orange-400">
                        Project Intake
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-black tracking-tight">
                      Send Your
                      <br />
                      Requirement
                    </h3>

                    <p className="mt-3 text-sm text-white/35 max-w-md">
                      Tell us what you are building. Upload drawings,
                      specifications or reference files if available.
                    </p>
                  </div>

                  <div
                    className="
                      hidden
                      sm:flex
                      w-14
                      h-14
                      rounded-2xl
                      border
                      border-orange-500/20
                      bg-orange-500/5
                      items-center
                      justify-center
                      text-orange-500
                      jova-float
                    "
                  >
                    <Crosshair size={25} />
                  </div>
                </div>

                <form
                  id="enquiry-form"
                  className="relative z-10 space-y-5"
                  onSubmit={handleSubmit}
                >
                  {/* Name + company */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      id="name"
                      label="Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />

                    <FormField
                      id="company"
                      label="Company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Email + phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      id="email"
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                    <FormField
                      id="phone"
                      label="Phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Requirement */}
                  <div className="relative">
                    <textarea
                      id="requirement"
                      value={formData.requirement}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Project / Requirement"
                      className="
                        peer
                        w-full
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.045]
                        px-5
                        pt-6
                        pb-4
                        text-sm
                        text-white
                        outline-none
                        resize-none
                        placeholder-transparent
                        transition-all
                        duration-300
                        focus:border-orange-500/70
                        focus:bg-orange-500/[0.04]
                        focus:shadow-[0_0_35px_rgba(255,107,0,0.08)]
                      "
                    />

                    <label
                      htmlFor="requirement"
                      className="
                        pointer-events-none
                        absolute
                        left-5
                        top-5
                        origin-left
                        text-[10px]
                        uppercase
                        tracking-[0.22em]
                        font-bold
                        text-white/35
                        transition-all
                        duration-300
                        peer-placeholder-shown:translate-y-0
                        peer-placeholder-shown:scale-100
                        peer-focus:-translate-y-3
                        peer-focus:scale-90
                        peer-focus:text-orange-400
                        peer-not-placeholder-shown:-translate-y-3
                        peer-not-placeholder-shown:scale-90
                      "
                    >
                      Project / Requirement
                    </label>
                  </div>

                  {/* File upload */}
                  <label
                    id="drawing-dropzone"
                    htmlFor="drawing"
                    className={`
                      group
                      relative
                      flex
                      items-center
                      gap-4
                      w-full
                      rounded-2xl
                      border
                      border-dashed
                      border-white/15
                      bg-white/[0.025]
                      px-5
                      py-5
                      cursor-pointer
                      overflow-hidden
                      hover:border-orange-500/50
                      hover:bg-orange-500/[0.04]
                      transition-all
                    ${highlightUpload ? ' !border-orange-500 !bg-orange-500/[0.08] shadow-[0_0_40px_rgba(255,107,0,0.35)]' : ''}`}
                  >
                    <div
                      className="
                        w-11
                        h-11
                        rounded-xl
                        border
                        border-orange-500/20
                        bg-orange-500/10
                        flex
                        items-center
                        justify-center
                        shrink-0
                        text-orange-500
                        group-hover:scale-105
                        transition-transform
                      "
                    >
                      <FileUp size={19} />
                    </div>

                    <div className="min-w-0">
                      <span className="block text-sm font-semibold text-white">
                        {file
                          ? file.name
                          : 'Upload Drawing / PDF'}
                      </span>

                      <span className="block mt-1 text-[10px] uppercase tracking-[0.18em] text-white/25">
                        PDF · PNG · JPG · DWG · DXF
                      </span>
                    </div>

                    <input
                      type="file"
                      id="drawing"
                      accept=".pdf,.png,.jpg,.jpeg,.dwg,.dxf"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>

                  {/* Status */}
                  {status.state === 'success' && (
                    <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
                      <CheckCircle2
                        size={17}
                        className="text-emerald-400 shrink-0"
                      />

                      <p className="text-sm font-semibold text-emerald-300">
                        {status.message}
                      </p>
                    </div>
                  )}

                  {status.state === 'error' && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                      <p className="text-sm font-semibold text-red-300">
                        {status.message}
                      </p>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status.state === 'loading'}
                    className="
                      group
                      relative
                      w-full
                      overflow-hidden
                      rounded-2xl
                      bg-gradient-to-r
                      from-orange-500
                      via-orange-500
                      to-orange-600
                      px-6
                      py-5
                      text-black
                      font-black
                      uppercase
                      tracking-[0.18em]
                      text-xs
                      shadow-[0_15px_50px_rgba(255,107,0,0.18)]
                      hover:shadow-[0_15px_70px_rgba(255,107,0,0.35)]
                      hover:-translate-y-1
                      transition-all
                      duration-500
                      disabled:opacity-50
                      disabled:hover:translate-y-0
                    "
                  >
                    <span
                      className="
                        absolute
                        inset-0
                        translate-x-[-110%]
                        skew-x-[-15deg]
                        bg-white/40
                        group-hover:translate-x-[110%]
                        transition-transform
                        duration-700
                      "
                    />

                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {status.state === 'loading'
                        ? 'Sending...'
                        : 'Submit Request'}

                      <Send
                        size={17}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                  </button>
                </form>

                {/* trust footer */}
                <div className="relative z-10 mt-7 pt-6 border-t border-white/10 flex flex-wrap gap-5 text-[9px] uppercase tracking-[0.18em] text-white/25">
                  <span className="flex items-center gap-2">
                    <ShieldCheck
                      size={13}
                      className="text-orange-500"
                    />
                    Secure enquiry
                  </span>

                  <span className="flex items-center gap-2">
                    <Factory
                      size={13}
                      className="text-orange-500"
                    />
                    Engineering team
                  </span>

                  <span className="flex items-center gap-2">
                    <ArrowUpRight
                      size={13}
                      className="text-orange-500"
                    />
                    Direct response
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM DATA STRIP
      ====================================================== */}

      <div className="relative z-20 max-w-[1500px] mx-auto mt-16 px-6 md:px-10 lg:px-16">
        <div className="border-y border-white/10 py-4 flex flex-wrap items-center gap-5 text-[8px] uppercase tracking-[0.3em] text-white/25">
          <span className="text-orange-500">●</span>

          <span>Engineering</span>

          <span className="w-px h-3 bg-white/10" />

          <span>Fabrication</span>

          <span className="w-px h-3 bg-white/10" />

          <span>Finishing</span>

          <span className="w-px h-3 bg-white/10" />

          <span>Installation</span>

          <span className="ml-auto font-mono text-orange-500/60">
            JM / CONTACT / 2026
          </span>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   REUSABLE FORM FIELD
============================================================ */

const FormField = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={label}
        className="
          peer
          w-full
          rounded-2xl
          border
          border-white/10
          bg-white/[0.045]
          px-5
          pt-6
          pb-4
          text-sm
          text-white
          outline-none
          placeholder-transparent
          transition-all
          duration-300
          focus:border-orange-500/70
          focus:bg-orange-500/[0.04]
          focus:shadow-[0_0_35px_rgba(255,107,0,0.08)]
        "
      />

      <label
        htmlFor={id}
        className="
          pointer-events-none
          absolute
          left-5
          top-5
          origin-left
          text-[10px]
          uppercase
          tracking-[0.22em]
          font-bold
          text-white/35
          transition-all
          duration-300
          peer-placeholder-shown:translate-y-0
          peer-placeholder-shown:scale-100
          peer-focus:-translate-y-3
          peer-focus:scale-90
          peer-focus:text-orange-400
          peer-not-placeholder-shown:-translate-y-3
          peer-not-placeholder-shown:scale-90
        "
      >
        {label}
      </label>
    </div>
  );
};

export default ContactForm;
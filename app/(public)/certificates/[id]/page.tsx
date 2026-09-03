"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Download, PartyPopper, QrCode, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CertificatePreview } from "@/components/certificates/certificate-preview";
import { getCertificate } from "@/lib/data/certificates";
import { getRecord } from "@/lib/data/records";
import { toast } from "sonner";

export default function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [showReveal, setShowReveal] = useState(true);
  const certificate = getCertificate(id);
  const record = certificate ? getRecord(certificate.recordId) : undefined;

  if (!certificate || !record) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-navy">Certificate not found</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <AnimatePresence>
        {showReveal && (
          <motion.button
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowReveal(false)}
            className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center bg-navy-gradient text-center text-white"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/15 text-gold-soft"
            >
              <PartyPopper className="h-10 w-10" />
            </motion.span>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-gold-soft"
            >
              Record Verified
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mt-3 font-display text-3xl font-semibold sm:text-4xl"
            >
              Congratulations!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-2 max-w-md text-white/70"
            >
              You are officially a <span className="font-semibold text-white">RBWR RECORD HOLDER</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-xs text-white/50"
            >
              Click anywhere to view your certificate
            </motion.p>
          </motion.button>
        )}
      </AnimatePresence>

      <CertificatePreview certificate={certificate} record={record} />

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button
          className="gap-2 bg-navy-gradient text-white hover:opacity-90"
          onClick={() => toast.success(`Downloading ${certificate.certificateNumber}.pdf`)}
        >
          <Download className="h-4 w-4" /> Download Certificate
        </Button>
        <Button asChild variant="outline" className="gap-2">
          <Link href={`/records/${record.id}`}>
            <Trophy className="h-4 w-4" /> View Public Record
          </Link>
        </Button>
        <Button asChild variant="outline" className="gap-2">
          <Link href={`/verify/${record.id}`}>
            <QrCode className="h-4 w-4" /> Verify QR
          </Link>
        </Button>
      </div>
    </div>
  );
}

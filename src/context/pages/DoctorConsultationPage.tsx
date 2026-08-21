import { Alert, Box, Button, Card, CardContent, CardHeader, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import { Activity, FlaskConical, Loader, Plus, Sparkles, Stethoscope, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { PatientHeader } from '@/components/PatientHeader';
import { LoadingState } from '@/components/LoadingState';
import { useApp } from '@/context/AppContext';

export function DoctorConsultationPage() {
  const { patients, selectedPatient } = useApp();
  const patient = selectedPatient || patients[0] || null;
  const [soap, setSoap] = useState({ subjective: '', objective: '', assessment: '', plan: '' });
  const [diagnoses, setDiagnoses] = useState<string[]>([]);
  const [newDx, setNewDx] = useState('');
  const [meds, setMeds] = useState<string[]>([]);
  const [newMed, setNewMed] = useState('');
  const [labs, setLabs] = useState<string[]>([]);
  const [newLab, setNewLab] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiNote, setAiNote] = useState('');
  const [saved, setSaved] = useState(false);

  if (!patient) return <Card><CardContent><Box sx={{ textAlign: 'center', py: 8 }}><Stethoscope size={32} color="#94a3b8" /><Typography color="text.secondary" sx={{ mt: 1 }}>No patients available.</Typography></Box></CardContent></Card>;

  const addDx = () => { if (newDx.trim()) { setDiagnoses([...diagnoses, newDx.trim()]); setNewDx(''); } };
  const addMed = () => { if (newMed.trim()) { setMeds([...meds, newMed.trim()]); setNewMed(''); } };
  const addLab = () => { if (newLab.trim()) { setLabs([...labs, newLab.trim()]); setNewLab(''); } };

  const generateAi = () => {
    setAiLoading(true); setAiNote('');
    setTimeout(() => {
      setAiNote(`CLINICAL SUMMARY: ${patient.firstName} ${patient.lastName} (${patient.uhid}) presented with ${patient.reason}. Vitals: ${patient.vitals ? `Temp ${patient.vitals.temperature}°F, BP ${patient.vitals.bloodPressure}, Pulse ${patient.vitals.pulse}, SpO2 ${patient.vitals.spo2}%` : 'not recorded'}. ${diagnoses.length ? `Working diagnoses: ${diagnoses.join(', ')}.` : ''} ${soap.assessment ? `Assessment: ${soap.assessment}.` : ''} ${soap.plan ? `Plan: ${soap.plan}.` : ''} ${meds.length ? `Medications prescribed: ${meds.join(', ')}.` : ''} ${labs.length ? `Lab orders: ${labs.join(', ')}.` : ''} Follow-up recommended in 7 days.`);
      setAiLoading(false);
    }, 1800);
  };

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  return (
    <>
      <PageHeader eyebrow="CLINICAL" title="Doctor Consultation" description="Review patient context, record findings, and prescribe treatment." actionLabel="Save Consultation" onAction={save} />
      {saved && <Alert severity="success" sx={{ borderRadius: 2 }}>Consultation saved successfully for {patient.firstName} {patient.lastName}.</Alert>}
      <PatientHeader patient={patient} />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card><CardHeader title="SOAP Notes" titleTypographyProps={{ variant: 'h3' }} subheader="Structured clinical documentation" subheaderTypographyProps={{ fontSize: 12 }} sx={{ pb: 0 }} /><CardContent>
            <Stack spacing={2}>
              <TextField fullWidth label="Subjective" multiline rows={2} value={soap.subjective} onChange={(e) => setSoap({ ...soap, subjective: e.target.value })} placeholder="Patient-reported symptoms and complaints..." />
              <TextField fullWidth label="Objective" multiline rows={2} value={soap.objective} onChange={(e) => setSoap({ ...soap, objective: e.target.value })} placeholder="Observable findings and test results..." />
              <TextField fullWidth label="Assessment" multiline rows={2} value={soap.assessment} onChange={(e) => setSoap({ ...soap, assessment: e.target.value })} placeholder="Clinical impression and differential diagnosis..." />
              <TextField fullWidth label="Plan" multiline rows={2} value={soap.plan} onChange={(e) => setSoap({ ...soap, plan: e.target.value })} placeholder="Treatment plan, medications, follow-up..." />
            </Stack>
          </CardContent></Card>
          <Card><CardHeader title="Diagnosis" titleTypographyProps={{ variant: 'h3' }} sx={{ pb: 0 }} /><CardContent>
            <Stack direction="row" spacing={1}><TextField fullWidth size="small" placeholder="Add diagnosis..." value={newDx} onChange={(e) => setNewDx(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addDx()} /><IconButton onClick={addDx} color="primary"><Plus size={18} /></IconButton></Stack>
            <Stack spacing={1} sx={{ mt: 1.5 }}>{diagnoses.map((d, i) => <Stack key={i} direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', bgcolor: 'primary.light', borderRadius: 1, px: 1.5, py: 1 }}><Typography sx={{ fontSize: 13, fontWeight: 600 }}>{d}</Typography><IconButton size="small" onClick={() => setDiagnoses(diagnoses.filter((_, idx) => idx !== i))}><Trash2 size={14} /></IconButton></Stack>)}</Stack>
          </CardContent></Card>
          <Card><CardHeader title="Medications" titleTypographyProps={{ variant: 'h3' }} sx={{ pb: 0 }} /><CardContent>
            <Stack direction="row" spacing={1}><TextField fullWidth size="small" placeholder="Add medication..." value={newMed} onChange={(e) => setNewMed(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addMed()} /><IconButton onClick={addMed} color="primary"><Plus size={18} /></IconButton></Stack>
            <Stack spacing={1} sx={{ mt: 1.5 }}>{meds.map((m, i) => <Stack key={i} direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', bgcolor: 'success.light', borderRadius: 1, px: 1.5, py: 1 }}><Typography sx={{ fontSize: 13, fontWeight: 600 }}>{m}</Typography><IconButton size="small" onClick={() => setMeds(meds.filter((_, idx) => idx !== i))}><Trash2 size={14} /></IconButton></Stack>)}</Stack>
          </CardContent></Card>
          <Card><CardHeader title="Laboratory Orders" titleTypographyProps={{ variant: 'h3' }} sx={{ pb: 0 }} /><CardContent>
            <Stack direction="row" spacing={1}><TextField fullWidth size="small" placeholder="Add lab order..." value={newLab} onChange={(e) => setNewLab(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addLab()} /><IconButton onClick={addLab} color="primary"><FlaskConical size={18} /></IconButton></Stack>
            <Stack spacing={1} sx={{ mt: 1.5 }}>{labs.map((l, i) => <Stack key={i} direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', bgcolor: 'warning.light', borderRadius: 1, px: 1.5, py: 1 }}><Typography sx={{ fontSize: 13, fontWeight: 600 }}>{l}</Typography><IconButton size="small" onClick={() => setLabs(labs.filter((_, idx) => idx !== i))}><Trash2 size={14} /></IconButton></Stack>)}</Stack>
          </CardContent></Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card><CardHeader title="AI Clinical Note" titleTypographyProps={{ variant: 'h3' }} subheader="Auto-generate from consultation data" subheaderTypographyProps={{ fontSize: 12 }} sx={{ pb: 0 }} action={<Sparkles size={18} color="#4f46e5" />} /><CardContent>
            <Button variant="contained" fullWidth startIcon={aiLoading ? <Loader size={16} className="animate-spin" /> : <Sparkles size={16} />} onClick={generateAi} disabled={aiLoading}>{aiLoading ? 'Generating...' : 'Generate AI Clinical Note'}</Button>
            {aiLoading && <LoadingState message="Analyzing consultation data..." />}
            {aiNote && <Alert severity="info" sx={{ mt: 2, borderRadius: 2, fontSize: 13, lineHeight: 1.6 }}>{aiNote}</Alert>}
          </CardContent></Card>
          <Card><CardContent><Button variant="contained" fullWidth startIcon={<Activity size={16} />} onClick={save}>Save Consultation</Button></CardContent></Card>
        </Grid>
      </Grid>
    </>
  );
}

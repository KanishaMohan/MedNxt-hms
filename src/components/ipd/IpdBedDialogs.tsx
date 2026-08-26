import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import {
  ArrowRightLeft,
  BedDouble,
  ClipboardList,
  History,
  LogOut,
  Plus,
  Save,
  UserRound,
  X,
} from 'lucide-react';

import { useMemo, useState } from 'react';

import type {
  Bed,
  EhrEvent,
  Patient,
} from '@/types';

/* =========================================================
   DIALOG TYPE
========================================================= */

export type IpdDialogType =
  | 'ASSIGN'
  | 'ROUNDS'
  | 'TRANSFER'
  | 'DISCHARGE';

/* Backward compatibility */
export type BedDialogType = IpdDialogType;

/* =========================================================
   MAIN PROPS
========================================================= */

interface IpdBedDialogsProps {
  type: IpdDialogType | null;

  bed: Bed | null;

  patient: Patient | null;

  patients: Patient[];

  beds: Bed[];

  ehrEvents: EhrEvent[];

  onClose: () => void;

  onAssign: (
    patient: Patient
  ) => void;

  onTransfer: (
    targetBed: Bed
  ) => void;

  onDischarge: () => void;

  onSaveRound: (
    event: EhrEvent
  ) => void;
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export function IpdBedDialogs({
  type,
  bed,
  patient,
  patients,
  beds,
  ehrEvents,
  onClose,
  onAssign,
  onTransfer,
  onDischarge,
  onSaveRound,
}: IpdBedDialogsProps) {
  if (!type || !bed) {
    return null;
  }

  /* =======================================================
     ASSIGN
  ======================================================= */

  if (type === 'ASSIGN') {
    return (
      <AssignPatientDialog
        bed={bed}
        patients={patients}
        onClose={onClose}
        onAssign={onAssign}
      />
    );
  }

  /* =======================================================
     ROUNDS
  ======================================================= */

  if (type === 'ROUNDS') {
    return (
      <RoundsDialog
        bed={bed}
        patient={patient}
        ehrEvents={ehrEvents}
        onClose={onClose}
        onSaveRound={onSaveRound}
      />
    );
  }

  /* =======================================================
     TRANSFER
  ======================================================= */

  if (type === 'TRANSFER') {
    return (
      <TransferDialog
        bed={bed}
        patient={patient}
        beds={beds}
        onClose={onClose}
        onTransfer={onTransfer}
      />
    );
  }

  /* =======================================================
     DISCHARGE
  ======================================================= */

  if (type === 'DISCHARGE') {
    return (
      <DischargeDialog
        bed={bed}
        patient={patient}
        onClose={onClose}
        onDischarge={onDischarge}
      />
    );
  }

  return null;
}

/* =========================================================
   ASSIGN PATIENT DIALOG
========================================================= */

function AssignPatientDialog({
  bed,
  patients,
  onClose,
  onAssign,
}: {
  bed: Bed;
  patients: Patient[];
  onClose: () => void;
  onAssign: (patient: Patient) => void;
}) {
  const [selectedPatientId, setSelectedPatientId] =
    useState('');

  const availablePatients = useMemo(() => {
    return patients.filter(
      (item) =>
        item.status !== 'DISCHARGED'
    );
  }, [patients]);

  const selectedPatient =
    patients.find(
      (item) =>
        item.id === selectedPatientId
    ) ?? null;

  const handleAssign = () => {
    if (!selectedPatient) {
      return;
    }

    onAssign(selectedPatient);
  };

  return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: {
          sx: {
            borderRadius: '12px',
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          px: 2.5,
          pt: 2,
          pb: 1.3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 700,
                color: '#202938',
              }}
            >
              Assign Patient
            </Typography>

            <Typography
              sx={{
                mt: 0.3,
                fontSize: 12,
                color: '#8b95a5',
              }}
            >
              Assign a patient to bed{' '}
              <strong>{bed.number}</strong>
            </Typography>
          </Box>

          <Button
            onClick={onClose}
            sx={{
              minWidth: 32,
              width: 32,
              height: 32,
              borderRadius: '7px',
              color: '#7b8798',
            }}
          >
            <X size={17} />
          </Button>
        </Box>
      </DialogTitle>

      <Divider />

      <DialogContent
        sx={{
          px: 2.5,
          py: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.2,
            p: 1.5,
            mb: 2,
            borderRadius: '9px',
            bgcolor: '#f5f6ff',
            border: '1px solid #e2e4ff',
          }}
        >
          <BedDouble
            size={20}
            color="#5146e5"
          />

          <Box>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              Bed {bed.number}
            </Typography>

            <Typography
              sx={{
                fontSize: 11,
                color: '#8b95a5',
              }}
            >
              {bed.ward}
            </Typography>
          </Box>
        </Box>

        <TextField
          select
          fullWidth
          size="small"
          label="Select Patient"
          value={selectedPatientId}
          onChange={(event) =>
            setSelectedPatientId(
              event.target.value
            )
          }
        >
          <MenuItem value="">
            Select a patient
          </MenuItem>

          {availablePatients.map(
            (item) => (
              <MenuItem
                key={item.id}
                value={item.id}
              >
                {item.firstName}{' '}
                {item.lastName}
                {item.uhid
                  ? ` - ${item.uhid}`
                  : ''}
              </MenuItem>
            )
          )}
        </TextField>

        {selectedPatient && (
          <Box
            sx={{
              mt: 1.5,
              p: 1.5,
              borderRadius: '9px',
              bgcolor: '#f8fafc',
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              Selected Patient
            </Typography>

            <Typography
              sx={{
                mt: 0.4,
                fontSize: 13,
                color: '#475569',
              }}
            >
              {selectedPatient.firstName}{' '}
              {selectedPatient.lastName}
            </Typography>

            <Typography
              sx={{
                mt: 0.2,
                fontSize: 11,
                color: '#94a3b8',
              }}
            >
              UHID: {selectedPatient.uhid}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          px: 2.5,
          pb: 2,
          gap: 1,
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          size="small"
          sx={{
            textTransform: 'none',
            borderRadius: '7px',
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleAssign}
          variant="contained"
          size="small"
          disabled={!selectedPatient}
          startIcon={
            <UserRound size={15} />
          }
          sx={{
            textTransform: 'none',
            borderRadius: '7px',
            bgcolor: '#5146e5',
            '&:hover': {
              bgcolor: '#4338ca',
            },
          }}
        >
          Assign Patient
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/* =========================================================
   ROUNDS DIALOG
========================================================= */

function RoundsDialog({
  bed,
  patient,
  ehrEvents,
  onClose,
  onSaveRound,
}: {
  bed: Bed;

  patient: Patient | null;

  ehrEvents: EhrEvent[];

  onClose: () => void;

  onSaveRound: (
    event: EhrEvent
  ) => void;
}) {
  const [temperature, setTemperature] =
    useState(
      patient?.vitals?.temperature
        ?.toString() ?? ''
    );

  const [bloodPressure, setBloodPressure] =
    useState(
      patient?.vitals?.bloodPressure ??
        ''
    );

  const [spo2, setSpo2] =
    useState(
      patient?.vitals?.spo2
        ?.toString() ?? ''
    );

  const [pulse, setPulse] =
    useState(
      patient?.vitals?.pulse
        ?.toString() ?? ''
    );

  const [staff, setStaff] =
    useState('Sister Mary (Morning)');

  const [observations, setObservations] =
    useState('');

  /* =======================================================
     PATIENT ID
  ======================================================= */

  const patientId =
    patient?.id ??
    bed.patientId ??
    '';

  /* =======================================================
     HISTORY
  ======================================================= */

  const history = useMemo(() => {
    if (!patientId) {
      return [];
    }

    return ehrEvents
      .filter(
        (event) =>
          event.patientId === patientId
      )
      .sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      );
  }, [ehrEvents, patientId]);

  /* =======================================================
     SAVE ROUND
  ======================================================= */

  const handleSaveRound = () => {
    if (!patientId) {
      return;
    }

    const now = new Date();

    const event: EhrEvent = {
      id: `ehr-round-${Date.now()}`,

      patientId,

      type: 'ROUND',

      title: 'Patient Rounds',

      description:
        `BP: ${
          bloodPressure || '-'
        } | ` +
        `Temp: ${
          temperature || '-'
        } | ` +
        `SpO2: ${
          spo2 || '-'
        } | ` +
        `Pulse: ${
          pulse || '-'
        }. ` +
        `${
          observations.trim() ||
          'No observations recorded.'
        }`,

      doctor: staff,

      date: now.toISOString(),
    };

    onSaveRound(event);

    setObservations('');
  };

  return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            borderRadius: '12px',
            maxHeight: '90vh',
            overflow: 'hidden',
          },
        },
      }}
    >
      {/* ===================================================
          HEADER
      =================================================== */}

      <DialogTitle
        sx={{
          px: 2.5,
          py: 1.5,
          bgcolor: '#39329b',
          color: '#fff',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <ClipboardList
              size={19}
            />

            <Box>
              <Typography
                sx={{
                  fontSize: 17,
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                Clinical Rounds & History
              </Typography>

              <Typography
                sx={{
                  mt: 0.2,
                  fontSize: 11,
                  opacity: 0.8,
                }}
              >
                {patient
                  ? `${patient.firstName} ${patient.lastName}`
                  : bed.patientName ||
                    'Patient'}{' '}
                • Bed {bed.number}
              </Typography>
            </Box>
          </Box>

          <Button
            onClick={onClose}
            sx={{
              minWidth: 30,
              width: 30,
              height: 30,
              color: '#fff',
              borderRadius: '6px',
            }}
          >
            <X size={18} />
          </Button>
        </Box>
      </DialogTitle>

      {/* ===================================================
          CONTENT
      =================================================== */}

      <DialogContent
        sx={{
          px: 2.5,
          py: 2,
          bgcolor: '#fff',
          overflowY: 'auto',
        }}
      >
        {/* NEW ROUND */}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.8,
            mb: 1.5,
          }}
        >
          <Plus
            size={17}
            color="#5146e5"
          />

          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 700,
              color: '#202938',
            }}
          >
            New Round Entry
          </Typography>
        </Box>

        {/* ROUND FORM */}

        <Box
          sx={{
            p: 2,
            borderRadius: '10px',
            bgcolor: '#fffaff',
            border: '1px solid #f2eaf5',
          }}
        >
          {/* TOP ROW */}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1.5,
              gap: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 800,
                color: '#7b8190',
                letterSpacing: 0.2,
              }}
            >
              CURRENT VITALS
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#7b8190',
                  whiteSpace: 'nowrap',
                }}
              >
                ATTENDING STAFF:
              </Typography>

              <TextField
                select
                size="small"
                value={staff}
                onChange={(event) =>
                  setStaff(
                    event.target.value
                  )
                }
                sx={{
                  minWidth: 190,

                  '& .MuiInputBase-root': {
                    fontSize: 12,
                    height: 34,
                  },
                }}
              >
                <MenuItem value="Sister Mary (Morning)">
                  Sister Mary (Morning)
                </MenuItem>

                <MenuItem value="Sister Mary (Evening)">
                  Sister Mary (Evening)
                </MenuItem>

                <MenuItem value="Dr. Sharma">
                  Dr. Sharma
                </MenuItem>

                <MenuItem value="Dr. Verma">
                  Dr. Verma
                </MenuItem>

                <MenuItem value="Dr. Gupta">
                  Dr. Gupta
                </MenuItem>
              </TextField>
            </Box>
          </Box>

          {/* VITALS */}

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(4, 1fr)',
              gap: 1,
              mb: 1.5,
            }}
          >
            <TextField
              size="small"
              label="BP"
              placeholder="120/80"
              value={bloodPressure}
              onChange={(event) =>
                setBloodPressure(
                  event.target.value
                )
              }
              fullWidth
            />

            <TextField
              size="small"
              label="TEMP"
              placeholder="98.6"
              value={temperature}
              onChange={(event) =>
                setTemperature(
                  event.target.value
                )
              }
              fullWidth
            />

            <TextField
              size="small"
              label="SPO2"
              placeholder="98"
              value={spo2}
              onChange={(event) =>
                setSpo2(
                  event.target.value
                )
              }
              fullWidth
            />

            <TextField
              size="small"
              label="PULSE"
              placeholder="72"
              value={pulse}
              onChange={(event) =>
                setPulse(
                  event.target.value
                )
              }
              fullWidth
            />
          </Box>

          {/* OBSERVATIONS */}

          <Typography
            sx={{
              mb: 0.7,
              fontSize: 11,
              fontWeight: 800,
              color: '#7b8190',
            }}
          >
            OBSERVATIONS
          </Typography>

          <TextField
            fullWidth
            multiline
            minRows={3}
            maxRows={5}
            placeholder="Patient complaints, nursing notes..."
            value={observations}
            onChange={(event) =>
              setObservations(
                event.target.value
              )
            }
            sx={{
              '& textarea': {
                fontSize: 13,
              },
            }}
          />

          {/* SAVE */}

          <Button
            fullWidth
            variant="contained"
            onClick={
              handleSaveRound
            }
            startIcon={
              <Save size={16} />
            }
            sx={{
              mt: 1.5,
              height: 40,
              borderRadius: '7px',
              textTransform: 'none',
              fontSize: 14,
              fontWeight: 700,
              bgcolor: '#5146e5',
              '&:hover': {
                bgcolor: '#4338ca',
              },
            }}
          >
            Save Round Log
          </Button>
        </Box>

        {/* =================================================
            HISTORY
        ================================================= */}

        <Box
          sx={{
            mt: 2.5,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.8,
              mb: 1.5,
            }}
          >
            <History
              size={17}
              color="#7b8190"
            />

            <Typography
              sx={{
                fontSize: 15,
                fontWeight: 700,
                color: '#202938',
              }}
            >
              Treatment History
            </Typography>
          </Box>

          {history.length === 0 ? (
            <Box
              sx={{
                py: 3,
                textAlign: 'center',
                borderRadius: '9px',
                bgcolor: '#f8fafc',
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  color: '#94a3b8',
                }}
              >
                No treatment history
                available.
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                position: 'relative',
                pl: 2.2,

                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 4,
                  top: 8,
                  bottom: 8,
                  width: '1px',
                  bgcolor: '#e6e1ee',
                },
              }}
            >
              {history.map(
                (
                  event,
                  index
                ) => (
                  <HistoryItem
                    key={event.id}
                    event={event}
                    isLast={
                      index ===
                      history.length - 1
                    }
                  />
                )
              )}
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

/* =========================================================
   HISTORY ITEM
========================================================= */

function HistoryItem({
  event,
  isLast,
}: {
  event: EhrEvent;
  isLast: boolean;
}) {
  const date = new Date(
    event.date
  );

  const dateText =
    date.toLocaleDateString(
      'en-US',
      {
        month: 'short',
        day: 'numeric',
      }
    ).toUpperCase();

  const timeText =
    date.toLocaleTimeString(
      'en-US',
      {
        hour: '2-digit',
        minute: '2-digit',
      }
    );

  const isRound =
    event.type === 'ROUND';

  return (
    <Box
      sx={{
        position: 'relative',
        pb: isLast ? 0 : 2,
        mb: isLast ? 0 : 2,
        borderBottom: isLast
          ? 'none'
          : '1px solid #f0edf3',
      }}
    >
      {/* DOT */}

      <Box
        sx={{
          position: 'absolute',
          left: -22,
          top: 2,
          width: 10,
          height: 10,
          borderRadius: '50%',
          bgcolor: '#eee9f4',
          border:
            '2px solid #f8f5fb',
        }}
      />

      {/* HEADER */}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          mb: 0.7,
        }}
      >
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 800,
            color: '#73798a',
          }}
        >
          {dateText}, {timeText}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              color: '#9aa1af',
            }}
          >
            By
          </Typography>

          <Box
            sx={{
              px: 0.9,
              py: 0.25,
              borderRadius: '10px',
              bgcolor: '#faf7fc',
              border:
                '1px solid #eee8f3',
            }}
          >
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 700,
                color: '#555b6b',
              }}
            >
              {event.doctor}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ROUND VITALS */}

      {isRound && (
        <Box
          sx={{
            px: 1,
            py: 0.8,
            mb: 0.7,
            borderRadius: '5px',
            bgcolor: '#fff8ff',
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              color: '#777386',
              lineHeight: 1.5,
            }}
          >
            {event.description}
          </Typography>
        </Box>
      )}

      {/* DESCRIPTION */}

      <Typography
        sx={{
          fontSize: 13,
          color: '#555b6b',
          lineHeight: 1.55,
        }}
      >
        {event.type ===
          'ROUND'
          ? extractObservation(
              event.description
            )
          : event.description}
      </Typography>
    </Box>
  );
}

/* =========================================================
   EXTRACT ROUND OBSERVATION
========================================================= */

function extractObservation(
  description: string
) {
  const parts =
    description.split('. ');

  if (parts.length <= 1) {
    return description;
  }

  return parts
    .slice(1)
    .join('. ');
}

/* =========================================================
   TRANSFER DIALOG
========================================================= */

function TransferDialog({
  bed,
  patient,
  beds,
  onClose,
  onTransfer,
}: {
  bed: Bed;
  patient: Patient | null;
  beds: Bed[];
  onClose: () => void;
  onTransfer: (
    targetBed: Bed
  ) => void;
}) {
  const [targetBedId, setTargetBedId] =
    useState('');

  const availableBeds =
    beds.filter(
      (item) =>
        item.status ===
          'AVAILABLE' &&
        item.id !== bed.id
    );

  const targetBed =
    beds.find(
      (item) =>
        item.id === targetBedId
    ) ?? null;

  const handleTransfer = () => {
    if (!targetBed) {
      return;
    }

    onTransfer(targetBed);
  };

  return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: {
          sx: {
            borderRadius: '12px',
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          px: 2.5,
          pt: 2,
          pb: 1.3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent:
              'space-between',
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              Transfer Patient
            </Typography>

            <Typography
              sx={{
                mt: 0.3,
                fontSize: 12,
                color: '#8b95a5',
              }}
            >
              Move patient to another
              bed
            </Typography>
          </Box>

          <Button
            onClick={onClose}
            sx={{
              minWidth: 32,
              width: 32,
              height: 32,
              color: '#7b8798',
            }}
          >
            <X size={17} />
          </Button>
        </Box>
      </DialogTitle>

      <Divider />

      <DialogContent
        sx={{
          px: 2.5,
          py: 2,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns:
              '1fr auto 1fr',
            alignItems: 'center',
            gap: 1,
            mb: 2,
          }}
        >
          <Box
            sx={{
              p: 1.4,
              borderRadius: '8px',
              bgcolor: '#f8fafc',
            }}
          >
            <Typography
              sx={{
                fontSize: 10,
                color: '#94a3b8',
              }}
            >
              CURRENT BED
            </Typography>

            <Typography
              sx={{
                mt: 0.3,
                fontSize: 17,
                fontWeight: 700,
              }}
            >
              {bed.number}
            </Typography>
          </Box>

          <ArrowRightLeft
            size={18}
            color="#5146e5"
          />

          <Box
            sx={{
              p: 1.4,
              borderRadius: '8px',
              bgcolor: '#f5f6ff',
            }}
          >
            <Typography
              sx={{
                fontSize: 10,
                color: '#94a3b8',
              }}
            >
              NEW BED
            </Typography>

            <Typography
              sx={{
                mt: 0.3,
                fontSize: 17,
                fontWeight: 700,
              }}
            >
              {targetBed?.number ||
                '—'}
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            mb: 0.7,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          Patient
        </Typography>

        <Box
          sx={{
            mb: 1.8,
            p: 1.3,
            borderRadius: '8px',
            bgcolor: '#f8fafc',
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {patient
              ? `${patient.firstName} ${patient.lastName}`
              : bed.patientName ||
                'Patient'}
          </Typography>
        </Box>

        <TextField
          select
          fullWidth
          size="small"
          label="Transfer To"
          value={targetBedId}
          onChange={(event) =>
            setTargetBedId(
              event.target.value
            )
          }
        >
          <MenuItem value="">
            Select available bed
          </MenuItem>

          {availableBeds.map(
            (item) => (
              <MenuItem
                key={item.id}
                value={item.id}
              >
                {item.number} —{' '}
                {item.ward}
              </MenuItem>
            )
          )}
        </TextField>
      </DialogContent>

      <DialogActions
        sx={{
          px: 2.5,
          pb: 2,
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          size="small"
          sx={{
            textTransform: 'none',
            borderRadius: '7px',
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleTransfer}
          variant="contained"
          size="small"
          disabled={!targetBed}
          startIcon={
            <ArrowRightLeft size={15} />
          }
          sx={{
            textTransform: 'none',
            borderRadius: '7px',
            bgcolor: '#5146e5',
            '&:hover': {
              bgcolor: '#4338ca',
            },
          }}
        >
          Transfer Patient
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/* =========================================================
   DISCHARGE DIALOG
========================================================= */

function DischargeDialog({
  bed,
  patient,
  onClose,
  onDischarge,
}: {
  bed: Bed;
  patient: Patient | null;
  onClose: () => void;
  onDischarge: () => void;
}) {
  return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: {
          sx: {
            borderRadius: '12px',
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          px: 2.5,
          pt: 2,
          pb: 1.3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent:
              'space-between',
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            Discharge Patient
          </Typography>

          <Button
            onClick={onClose}
            sx={{
              minWidth: 32,
              width: 32,
              height: 32,
              color: '#7b8798',
            }}
          >
            <X size={17} />
          </Button>
        </Box>
      </DialogTitle>

      <Divider />

      <DialogContent
        sx={{
          px: 2.5,
          py: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 1.2,
            p: 1.5,
            borderRadius: '9px',
            bgcolor: '#fff7ed',
            border:
              '1px solid #fed7aa',
          }}
        >
          <LogOut
            size={20}
            color="#f97316"
          />

          <Box>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {patient
                ? `${patient.firstName} ${patient.lastName}`
                : bed.patientName ||
                  'Patient'}
            </Typography>

            <Typography
              sx={{
                mt: 0.2,
                fontSize: 11,
                color: '#8b95a5',
              }}
            >
              Bed {bed.number}
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            mt: 1.8,
            fontSize: 12,
            color: '#64748b',
            lineHeight: 1.6,
          }}
        >
          Are you sure you want to
          discharge this patient?
          The bed will be moved to
          housekeeping after
          discharge.
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          px: 2.5,
          pb: 2,
          gap: 1,
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          size="small"
          sx={{
            textTransform: 'none',
            borderRadius: '7px',
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={onDischarge}
          variant="contained"
          size="small"
          startIcon={
            <LogOut size={15} />
          }
          sx={{
            textTransform: 'none',
            borderRadius: '7px',
            bgcolor: '#ef4444',
            '&:hover': {
              bgcolor: '#dc2626',
            },
          }}
        >
          Confirm Discharge
        </Button>
      </DialogActions>
    </Dialog>
  );
}
import { Card, Box, Typography } from "@mui/material";

import { revenueClassification } from "@/services/mockData";

export function RevenueClassification() {
  const totalRevenue = revenueClassification.reduce(
    (total, item) => total + item.amount,
    0
  );

  return (
    <Card
      sx={{
        height: "100%",
        minHeight: 365,
        p: { xs: 2, sm: 2.5 },

        // Same corner style as the other dashboard cards
        borderRadius: 1.5,

        border: "1px solid #f1f5f9",
        boxShadow: "0 1px 5px rgba(15, 23, 42, 0.06)",
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 2.5 }}>
        <Typography
          sx={{
            fontSize: { xs: 15, sm: 16 },
            fontWeight: 700,
            color: "#334155",
          }}
        >
          Revenue Classification
        </Typography>

        <Typography
          sx={{
            mt: 0.4,
            fontSize: 11,
            color: "#94a3b8",
          }}
        >
          Estimated revenue breakdown by service.
        </Typography>
      </Box>

      {/* Revenue Items */}
      <Box>
        {revenueClassification.map((item) => (
          <Box
            key={item.name}
            sx={{
              mb: 2.1,
            }}
          >
            {/* Label + Amount */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 0.7,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.8,
                }}
              >
                {/* Color Indicator */}
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    bgcolor: item.color,
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#475569",
                  }}
                >
                  {item.name}
                </Typography>
              </Box>

              {/* Amount */}
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#334155",
                }}
              >
                ₹{item.amount.toLocaleString("en-IN")}
              </Typography>
            </Box>

            {/* Progress Bar */}
            <Box
              sx={{
                width: "100%",
                height: 6,
                borderRadius: 999,
                bgcolor: "#eef2f7",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: `${item.percentage}%`,
                  height: "100%",
                  bgcolor: item.color,
                  borderRadius: 999,
                }}
              />
            </Box>

            {/* Percentage */}
            <Typography
              sx={{
                mt: 0.35,
                fontSize: 9,
                color: "#94a3b8",
                textAlign: "right",
              }}
            >
              {item.percentage}%
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Total */}
      <Box
        sx={{
          mt: 1,
          pt: 1.5,
          borderTop: "1px solid #eef2f7",

          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 600,
            color: "#64748b",
          }}
        >
          Total Estimated Revenue
        </Typography>

        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 800,
            color: "#334155",
          }}
        >
          ₹{totalRevenue.toLocaleString("en-IN")}
        </Typography>
      </Box>
    </Card>
  );
}
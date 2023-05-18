import PropTypes from "prop-types";
import ListBulletIcon from "@heroicons/react/24/solid/ListBulletIcon";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";

export const OverviewSachThue = (props) => {
  const { value, sx } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" gutterBottom variant="overline">
              NUMBER OF BOOK FOR RENT
            </Typography>
            <Typography variant="h4">{value} Books</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "warning.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <ListBulletIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewSachThue.propTypes = {
  value: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

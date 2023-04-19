import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon
} from '@mui/material';

export const OverviewList = (props) => {
  const { pepole = [], sx } = props;
  return (
    <Card sx={sx}>
      <CardHeader title="Top 5 thành viên có điểm cao nhất" />
      <List>
        {pepole.map((user) => {
  
          return (
            <ListItem
              key={user.id}
            >
              <ListItemAvatar>
                {
                  user.imguser
                    ? (
                      <Box
                        component="img"
                        src={user.imguser}
                        sx={{
                          borderRadius: 1,
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                    : (
                      <Box
                        sx={{
                          borderRadius: 1,
                          backgroundColor: 'neutral.200',
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                }
              </ListItemAvatar>
              <ListItemText
                primary={user.name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={user.email}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <ListItemText
                style={{textAlign: "end"}}
                primary={user.point}
              />
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </Card>
  );
};
OverviewList.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object
};

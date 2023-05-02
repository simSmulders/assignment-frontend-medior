import { 
  Box,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction
} from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote'
import { useNavigate } from 'react-router-dom';
import { MouseEvent } from 'react';

const actions = [
  { icon: <EditNoteIcon />, name: 'Fruit overview' },
  { icon: <EditNoteIcon />, name: 'Vegetable overview' }
];

export interface ProductSpeedDialProps {};

export const ProductSpeedDial = (props:ProductSpeedDialProps) => {

  const navigate = useNavigate();

  const handleClick = (event: MouseEvent)=> {
    if (event.currentTarget.ariaLabel === "Fruit overview") {
      navigate('/admin/fruits')
    } else {
      navigate('/admin/vegetables')
    }
  }

  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="Products overview"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleClick}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
import { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import Inventory2Outlined from '@mui/icons-material/Inventory2Outlined';
import PeopleOutlined from '@mui/icons-material/PeopleOutlined';
import ReceiptOutlined from '@mui/icons-material/ReceiptOutlined';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import type { SvgIconComponent } from '@mui/icons-material';
import type { NavMenuStyles } from '../../types/brand';

interface Props {
  navStyles: NavMenuStyles;
  fontFamily?: string;
  dark?: boolean;
}

const NAV_ITEMS: { id: string; label: string; icon: SvgIconComponent; children?: string[] }[] = [
  { id: 'overview',   label: 'Overview',   icon: HomeOutlined,       children: ['Dashboard', 'Analytics', 'Reports'] },
  { id: 'products',   label: 'Products',   icon: Inventory2Outlined  },
  { id: 'customers',  label: 'Customers',  icon: PeopleOutlined      },
  { id: 'orders',     label: 'Orders',     icon: ReceiptOutlined     },
  { id: 'settings',   label: 'Settings',   icon: SettingsOutlined    },
];

export function PreviewNavMenu({ navStyles, fontFamily = 'inherit', dark = false }: Props) {
  const [openId, setOpenId]           = useState<string>('overview');
  const [activeChild, setActiveChild] = useState<string>('Dashboard');

  const iconColor   = dark ? '#9ca3af' : '#6b7280';
  const subItemBg   = dark ? '#121212' : '#fafafa';
  const hoverBg     = dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)';

  const labelSx = {
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: 'normal',
    textTransform: 'none' as const,
    color: navStyles.textColor,
    fontFamily,
  };

  return (
    <List
      dense
      disablePadding
      sx={{
        width: '100%',
        maxWidth: 260,
        bgcolor: navStyles.backgroundColor,
        fontFamily,
      }}
    >
      {NAV_ITEMS.map((item) => (
        <div key={item.id}>

          <ListItemButton
            onClick={() => item.children && setOpenId(openId === item.id ? '' : item.id)}
            sx={{ py: '10px', px: '14px', '&:hover': { bgcolor: hoverBg } }}
          >
            <ListItemIcon sx={{ minWidth: 34, color: iconColor }}>
              <item.icon sx={{ fontSize: 18 }} />
            </ListItemIcon>
            <ListItemText disableTypography primary={<span style={labelSx}>{item.label}</span>} />
            {item.children && (
              openId === item.id
                ? <ExpandLess sx={{ color: iconColor, fontSize: 18 }} />
                : <ExpandMore sx={{ color: iconColor, fontSize: 18 }} />
            )}
          </ListItemButton>

          {item.children && (
            <Collapse in={openId === item.id} timeout="auto" unmountOnExit>
              <List dense disablePadding>
                {item.children.map(child => {
                  const isActive = activeChild === child;
                  return (
                    <ListItemButton
                      key={child}
                      onClick={() => setActiveChild(child)}
                      sx={{
                        pl: '48px',
                        py: '9px',
                        bgcolor: isActive ? navStyles.activeBackgroundColor : subItemBg,
                        '&:hover': {
                          bgcolor: isActive ? navStyles.activeBackgroundColor : hoverBg,
                        },
                      }}
                    >
                      <ListItemText
                        disableTypography
                        primary={
                          <span style={{
                            fontSize: 13,
                            fontWeight: 400,
                            color: isActive ? navStyles.activeTextColor : navStyles.textColor,
                            fontFamily,
                          }}>
                            {child}
                          </span>
                        }
                      />
                    </ListItemButton>
                  );
                })}
              </List>
            </Collapse>
          )}
        </div>
      ))}
    </List>
  );
}

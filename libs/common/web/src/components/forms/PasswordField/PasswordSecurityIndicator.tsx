import { Box, Stack, Typography } from '@mui/material';

import { PasswordSecurityIndicatorProps } from './PasswordField.types';
import { securityConstraints } from './Password.utils';

export function PasswordSecurityIndicator({ password }: PasswordSecurityIndicatorProps) {
  const constraints = securityConstraints.map(constraint => ({
    ...constraint,
    isMet: constraint.regex.test(password),
  }));

  const numberOfMetConstraints = constraints.filter(constraint => constraint.isMet).length;
  const getColor = (idx: number) =>
    idx <= numberOfMetConstraints ? 'success.main' : 'action.disabledBackground';

  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1}>
        {constraints.map(({ label }, idx) => (
          <Box
            key={label}
            sx={{
              bgcolor: getColor(idx + 1),
              height: 10,
              flexGrow: 1,
              borderRadius: 1,
            }}
          />
        ))}
      </Stack>

      {constraints.map(({ label, isMet }) => (
        <Typography key={label}>
          <Box
            component="span"
            sx={{
              bgcolor: isMet ? 'success.main' : 'action.disabledBackground',
              color: isMet ? 'inherit' : 'text.disabled',
              height: 10,
              width: 10,
              borderRadius: 1,
              display: 'inline-block',
              marginRight: 1,
            }}
          />

          {label}
        </Typography>
      ))}
    </Stack>
  );
}

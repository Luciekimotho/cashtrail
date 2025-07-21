import {
  makeStyles,
  shorthands,
  tokens,
} from "@fluentui/react-components";
import { Text, Link } from "@fluentui/react-components";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    ...shorthands.padding("1rem"),
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
  },
});

export const Header = () => {
  const styles = useStyles();

  return (
    <header className={styles.root}>
      <Text as="h1" weight="bold" size={600}>
        CashTrail
      </Text>
      <nav>
        <RouterLink to="/" style={{ textDecoration: 'none' }}>
          <Link>Dashboard</Link>
        </RouterLink>
        <RouterLink to="/reports" style={{ marginLeft: "1rem", textDecoration: 'none' }}>
          <Link>Reports</Link>
        </RouterLink>
      </nav>
    </header>
  );
};
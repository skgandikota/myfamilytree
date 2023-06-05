import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "../../components/AppBar";
import Toolbar from "../../components/Toolbar";
import { auth, logout, signInWithGoogle } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import CircularProgress from "@mui/material/CircularProgress";

const rightLink = {
  fontSize: 16,
  ml: 3,
  fontFamily: "Roboto",
  fontWeight: 400,
};

function AppAppBar() {
  const [user, loading] = useAuthState(auth);
  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant='h6'
            underline='none'
            color='inherit'
            href='#'
            sx={{ fontSize: 24, fontFamily: "Roboto", fontWeight: 400 }}
          >
            {"My Family Tree"}
          </Link>

          {loading ? (
            <CircularProgress
              color='inherit'
              sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
            />
          ) : user?.uid ? (
            <>
              <Box
                sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
              >
                {user?.displayName === "Sai Koushik Gandikota" || user?.displayName === "Ramagopalg Gandikota" && (
                  <Link
                    color='inherit'
                    variant='h6'
                    underline='none'
                    sx={rightLink}
                    href='/edit'
                  >
                    {"Edit"}
                  </Link>
                )}

                <Link
                  color='inherit'
                  variant='h6'
                  underline='none'
                  sx={rightLink}
                  onClick={logout}
                >
                  {"Logout"}
                </Link>
              </Box>
            </>
          ) : (
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <Link
                color='inherit'
                variant='h6'
                underline='none'
                sx={rightLink}
                onClick={signInWithGoogle}
                id='google-sign-in'
              >
                {"Sign In"}
              </Link>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;

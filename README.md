import * as Users from "./pages/private/Dashboard/Users";
import * as Feedback from "./pages/private/Dashboard/Feedbacks";
import * as LessonsDashboard from "./pages/private/Dashboard/LessonsDashboard";
import * as Test1 from "./pages/Test1";
import * as Login from "./pages/public/Login";
import * as Onboarding from "./pages/private/Onboarding";
import * as ForgotPassword from "./pages/public/ForgotPassword";
import * as Register from "./pages/public/Register";
import * as ActivateAccount from "./pages/public/ActivateAccount";
import * as RecoverPassword from "./pages/private/RecoverPassword";
import * as Hub from "./pages/private/Hub";
import * as CreateLesson from "./pages/private/CreateLesson";
import * as ResetPassword from "./pages/private/Settings/ResetPassword";
import * as Profile from "./pages/private/Settings/Profile";
import * as Account from "./pages/private/Settings/Account";
import * as Appearance from "./pages/private/Settings/Appearance";
import * as Notifications from "./pages/private/Settings/Notifications";
import * as General from "./pages/private/Settings/General";
import * as Plans from "./pages/private/Settings/Plans";
import * as Quiz from "./pages/private/Quiz";
import * as Lessons from "./pages/private/Lessons";
import * as Classroom from "./pages/private/Classroom";
import * as Unauthorised from "./pages/private/Unauthorised";
// import * as Whiteboard from "./pages/private/Whiteboard";
import * as EmailConfirmation from "./pages/private/EmailConfirmation";
import PublicWrapper from "./pages/public/PublicWrapper";
import PrivateWrapper from "./pages/private/PrivateWrapper";
import SettingsWrapper from "./pages/private/Settings/SettingsWrapper";
import DashboardWrapper from "./pages/private/Dashboard/DashboardWrapper";
import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import { STUDENT_ACCESS_LEVEL, ADMIN_ACCESS_LEVEL } from "./lib/accessLevels";
import GlobalRouteErrorElement from "./components/common/error/GlobalRouteErrorElement";

const RouteWithErrorBoundary = {
    ErrorBoundary: GlobalRouteErrorElement,
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" replace />,
        ...RouteWithErrorBoundary,
    },
    // {
    //     path: "/",
    //     element: <PrivateWrapper requiredAccessLevel={STUDENT_ACCESS_LEVEL} />,
    // },
    // {
    //     path: "/waiting-list",
    //     element: (
    //         <>
    //             <WaitingList.Element />
    //             <PublicFooter />
    //         </>
    //     ),
    // },
    // {
    //     path: "*",
    //     element: <Navigate to="/" replace />,
    // },

    {
        path: "/test",
        element: <Test1.Element />,
        ...RouteWithErrorBoundary,
    },
    {
        path: "/",
        element: <PublicWrapper />,
        ...RouteWithErrorBoundary,
        children: [
            {
                path: "/login",
                element: <Login.Element />,
            },
            {
                path: "/register",
                element: <Register.Element />,
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword.Element />,
            },
        ],
    },
    {
        path: "/activate",
        element: <ActivateAccount.Element />,
        ...RouteWithErrorBoundary
    },
    {
        path: "/",
        element: <PrivateWrapper requiredAccessLevel={STUDENT_ACCESS_LEVEL} />,
        // errorElement: <Error />, need to implement this
        ...RouteWithErrorBoundary,
        children: [
            {
                path: "/onboarding",
                element: <Onboarding.Element />,
            },
            {
                path: "/email-confirm",
                element: <EmailConfirmation.Element />,
            },
            {
                path: "/reset-password",
                element: <RecoverPassword.Element />,
            },
            {
                path: "/hub",
                element: <Hub.Element />,
            },
            {
                path: "/settings",
                element: <SettingsWrapper />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="/settings/general" replace />,
                    },
                    {
                        path: "/settings/general",
                        element: <General.Element />,
                    },
                    {
                        path: "/settings/reset-password",
                        element: <ResetPassword.Element />,
                    },
                    {
                        path: "/settings/profile",
                        element: <Profile.Element />,
                    },
                    {
                        path: "/settings/account",
                        element: <Account.Element />,
                    },
                    {
                        path: "/settings/appearance",
                        element: <Appearance.Element />,
                    },
                    {
                        path: "/settings/notifications",
                        element: <Notifications.Element />,
                    },
                    {
                        path: "/settings/plans",
                        element: <Plans.Element />,
                    },
                    {
                        path: "*",
                        element: <Navigate to="/settings/general" replace />,
                    },
                ],
            },
            {
                path: "/dashboard",
                element: <DashboardWrapper />,
                children: [
                    {
                        path: "/dashboard/lessons",
                        element: <LessonsDashboard.Element />,
                        loader: LessonsDashboard.loader,
                        action: LessonsDashboard.action,
                    },
                    {
                        path: "/dashboard/users",
                        element: <Users.Element />,
                        loader: Users.loader,
                    },
                    {
                        path: "feedbacks",
                        element: <Feedback.Element />,
                        loader: Feedback.loader,
                    },
                ],
            },
            {
                path: "/lessons",
                element: <Lessons.Element />,
                loader: Lessons.loader,
            },
            {
                path: "/quiz/:lessonName", // ?id="yer28736427384yb23c78e"
                element: <Quiz.Element />,
                loader: Quiz.loader,
            },
            {
                path: "/lessons/:lessonName", // ?id="yer28736427384yb23c78e"
                element: <Classroom.Element />,
                loader: Classroom.loader,
            },
            // {
            //     path: "/whiteboard",
            //     element: <Whiteboard.Element />,
            // }
        ],
    },
    {
        path: "/",
        element: <PrivateWrapper requiredAccessLevel={ADMIN_ACCESS_LEVEL} />,
        ...RouteWithErrorBoundary,
        children: [
            {
                path: "/create-lesson",
                element: <CreateLesson.Element action="create" />,
            },
            {
                path: "/edit-lesson",
                element: <CreateLesson.Element action="edit" />,
            },
        ],
    },
    {
        path: "/unauthorised",
        element: <Unauthorised.Element />,
        ...RouteWithErrorBoundary,
    },
]);

function Router() {
    return <RouterProvider router={router} />;
}

export default Router;

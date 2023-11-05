import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/personal/Layout";
import Public from "./components/public/Public";
import Login from "./features/auth/Login";
import Welcome from "./features/auth/Welcome";
import PersonalLayout from "./components/personal/PersonalLayout";
import AppealsList from "./features/appeals/AppealsList";
import ResidentsList from "./features/residents/ResidentsList";
import PublicMain from "./components/public/main/PublicMain";
import PublicContacts from "./components/public/contacts/PublicContacts";
import PublicDocuments from "./components/public/documents/PublicDocuments";
import PublicReport from "./components/public/report/PublicReport";
import PublicEstimate from "./components/public/estimate/PublicEstimate";
import PublicDebtors from "./components/public/debtors/PublicDebtors";
import PublicNews from "./components/public/news/PublicNews";
import PublicRule from "./components/public/rule/PublicRule";
import PublicDecision from "./components/public/decision/PublicDecision";
import PublicTariffs from "./components/public/tariffs/PublicTariffs";
import EditResident from "./features/residents/EditResident";
import NewResidentForm from "./features/residents/NewResidentForm";
import EditAppeal from "./features/appeals/EditAppeal";
import NewAppeal from "./features/appeals/NewAppeal";
import EditAppealHead from "./features/appeals/EditAppealHead";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { ROLES } from "./config/roles";

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Routes>
                    <Route path="/" element={<Layout></Layout>}>
                        <Route element={<Public></Public>}>
                            <Route
                                index
                                element={<PublicMain></PublicMain>}
                            ></Route>
                            <Route
                                path="contacts"
                                element={<PublicContacts></PublicContacts>}
                            ></Route>
                            <Route
                                path="documents"
                                element={<PublicDocuments></PublicDocuments>}
                            ></Route>
                            <Route
                                path="report"
                                element={<PublicReport></PublicReport>}
                            ></Route>
                            <Route
                                path="estimate"
                                element={<PublicEstimate></PublicEstimate>}
                            ></Route>
                            <Route
                                path="debtors"
                                element={<PublicDebtors></PublicDebtors>}
                            ></Route>
                            <Route
                                path="news"
                                element={<PublicNews></PublicNews>}
                            ></Route>
                            <Route
                                path="rule"
                                element={<PublicRule></PublicRule>}
                            ></Route>
                            <Route
                                path="decision"
                                element={<PublicDecision></PublicDecision>}
                            ></Route>
                            <Route
                                path="tariffs"
                                element={<PublicTariffs></PublicTariffs>}
                            ></Route>
                        </Route>
                    </Route>

                    <Route path="login" element={<Login></Login>}></Route>

                    <Route element={<PersistLogin></PersistLogin>}>
                        <Route
                            element={
                                <RequireAuth
                                    allowedRoles={[...Object.values(ROLES)]}
                                ></RequireAuth>
                            }
                        >
                            <Route element={<Prefetch />}>
                                <Route
                                    path="personal"
                                    element={<PersonalLayout></PersonalLayout>}
                                >
                                    {/* <Route
                            path="welcome"
                            index
                            element={<Welcome></Welcome>}
                        ></Route>{" "}
                        тернарный оператор в зависимости от роли пользователя */}
                                    <Route
                                        element={
                                            <RequireAuth
                                                allowedRoles={[ROLES.Head]}
                                            ></RequireAuth>
                                        }
                                    >
                                        <Route path="residents-appeals">
                                            <Route
                                                index
                                                element={
                                                    <AppealsList></AppealsList>
                                                }
                                            ></Route>
                                            <Route
                                                path=":id"
                                                element={
                                                    <EditAppeal></EditAppeal>
                                                }
                                            ></Route>
                                            <Route
                                                path="head/:id"
                                                element={
                                                    <EditAppealHead></EditAppealHead>
                                                }
                                            ></Route>
                                            <Route
                                                path="new"
                                                element={
                                                    <NewAppeal></NewAppeal>
                                                }
                                            ></Route>
                                        </Route>
                                        <Route path="residents-list">
                                            <Route
                                                index
                                                element={
                                                    <ResidentsList></ResidentsList>
                                                }
                                            ></Route>
                                            <Route
                                                path=":id"
                                                element={
                                                    <EditResident></EditResident>
                                                }
                                            ></Route>
                                            <Route
                                                path="new"
                                                element={
                                                    <NewResidentForm></NewResidentForm>
                                                }
                                            ></Route>
                                        </Route>
                                        <Route path="add-announcement">
                                            <Route
                                                index
                                                element={
                                                    <AppealsList></AppealsList>
                                                }
                                            ></Route>
                                        </Route>
                                        <Route path="add-news">
                                            <Route
                                                index
                                                element={
                                                    <AppealsList></AppealsList>
                                                }
                                            ></Route>
                                        </Route>
                                        <Route path="add-voting">
                                            <Route
                                                index
                                                element={
                                                    <AppealsList></AppealsList>
                                                }
                                            ></Route>
                                        </Route>
                                    </Route>

                                    <Route
                                        element={
                                            <RequireAuth
                                                allowedRoles={[ROLES.Resident]}
                                            ></RequireAuth>
                                        }
                                    >
                                        <Route path="announcements">
                                            <Route
                                                index
                                                element={
                                                    <AppealsList></AppealsList>
                                                }
                                            ></Route>
                                        </Route>
                                        <Route path="news">
                                            <Route
                                                index
                                                element={
                                                    <AppealsList></AppealsList>
                                                }
                                            ></Route>
                                        </Route>
                                        <Route path="votings">
                                            <Route
                                                index
                                                element={
                                                    <AppealsList></AppealsList>
                                                }
                                            ></Route>
                                        </Route>
                                        <Route path="write-appeal">
                                            <Route
                                                index
                                                element={
                                                    <AppealsList></AppealsList>
                                                }
                                            ></Route>
                                        </Route>
                                        <Route path="my-appeals">
                                            <Route
                                                index
                                                element={
                                                    <AppealsList></AppealsList>
                                                }
                                            ></Route>
                                        </Route>
                                        <Route path="accrual">
                                            <Route
                                                index
                                                element={
                                                    <AppealsList></AppealsList>
                                                }
                                            ></Route>
                                        </Route>
                                        <Route path="vote">
                                            <Route
                                                index
                                                element={
                                                    <AppealsList></AppealsList>
                                                }
                                            ></Route>
                                        </Route>
                                    </Route>
                                </Route>
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </Provider>
        </BrowserRouter>
    );
}

export default App;

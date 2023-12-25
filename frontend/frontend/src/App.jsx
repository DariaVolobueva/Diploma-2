import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/personal/Layout";
import Public from "./components/public/Public";
import Login from "./features/auth/Login";
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
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { ROLES } from "./config/roles";
import NewsList from "./features/news/NewsList";
import EditNews from "./features/news/EditNews";
import NewNewsForm from "./features/news/NewNewsForm";
import AppealsListResident from "./features/appeals/AppealsListResident";
import VoteList from "./features/votes/VoteList";
import NewVoteForm from "./features/votes/NewVoteForm";
import PublicNewsFull from "./components/public/news/PublicNewsFull";
import PublicLaws from "./components/public/laws/PublicLaws";
import AccrualList from "./features/accruals/AccrualList";

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
                            <Route path="news">
                                <Route
                                    index
                                    element={<PublicNews></PublicNews>}
                                ></Route>
                                <Route
                                    path=":id"
                                    element={<PublicNewsFull></PublicNewsFull>}
                                ></Route>
                            </Route>
                            <Route
                                path="laws"
                                element={<PublicLaws></PublicLaws>}
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

                                        <Route path="news">
                                            <Route
                                                index
                                                element={<NewsList></NewsList>}
                                            ></Route>
                                            <Route
                                                path=":id"
                                                element={<EditNews></EditNews>}
                                            ></Route>
                                            <Route
                                                path="new"
                                                element={
                                                    <NewNewsForm></NewNewsForm>
                                                }
                                            ></Route>
                                        </Route>

                                        <Route path="voting">
                                            <Route
                                                index
                                                element={<VoteList></VoteList>}
                                            ></Route>
                                            <Route
                                                path="new"
                                                element={
                                                    <NewVoteForm></NewVoteForm>
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
                                        <Route path="accrual">
                                            <Route
                                                index
                                                element={
                                                    <AccrualList></AccrualList>
                                                }
                                            ></Route>
                                        </Route>

                                        <Route path="my-voting">
                                            <Route
                                                index
                                                element={<VoteList></VoteList>}
                                            ></Route>
                                        </Route>

                                        <Route path="my-appeals">
                                            <Route
                                                index
                                                element={
                                                    <AppealsListResident></AppealsListResident>
                                                }
                                            ></Route>
                                            <Route
                                                path="new"
                                                element={
                                                    <NewAppeal></NewAppeal>
                                                }
                                            ></Route>
                                            <Route
                                                path=":id"
                                                element={
                                                    <EditAppeal></EditAppeal>
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

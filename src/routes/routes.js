import { Switch, Route } from 'react-router-dom'
import Staff from '../components/admin/staff'
import Division from '../components/admin/division'
import Standard from '../components/admin/standard'
import Student from '../components/admin/student'
import AdminDashBoard from '../components/admin/dashboard'
import ManageAccount from '../components/shared/manage-account'
import MarkAttendance from '../components/staff/attendance/mark-attendance'
import LeaveRequest from '../components/student/leave'
import AttendanceReports from '../components/student/attendance/attendance-reports'
import ManageLeave from '../components/staff/leaves/manage-leave'
import LeaveReports from '../components/admin/leave/leave-reports'

const routes = () => {
    return (
        <Switch>
            {/* admin routes */}
            <Route path="/home" exact component={AdminDashBoard} />
            <Route path="/manage-staff" exact component={Staff} />
            <Route path="/manage-division" exact component={Division} />
            <Route path="/manage-standard" exact component={Standard} />
            <Route path="/manage-student" exact component={Student} />
            <Route path="/leave-reports" exact component={LeaveReports} />

            {/* staff routes */}
            <Route path="/manage-attendance" exact component={MarkAttendance} />
            <Route path="/manage-leave" exact component={ManageLeave} />

            {/* student routes */}
            <Route path="/leave-request" exact component={LeaveRequest} />
            <Route path="/attendance-reports" exact component={AttendanceReports} />

            {/* common routes */}
            <Route path="/my-account" exact component={ManageAccount} />
        </Switch>
    )
}

export default routes
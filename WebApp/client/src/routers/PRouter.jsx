import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from '../screens/login';
import Register from '../screens/register';
import Layout from '../screens/layout';
import ParkingUsers from '../screens/parkingusers'
import AppUsers from '../screens/appusers'
import LiveFeed from '../screens/LiveFeed'
import Sites from '../screens/sites'
import Vehicles from '../screens/vehicles'
import Permissions from '../screens/permissions'
import AddAppUser from '../screens/addappuser';
import AddParkingUser from '../screens/addparkinguser';
import AddPermission from '../screens/addpermission';
import AddSite from '../screens/addsite';
import AddVehicle from '../screens/addvehicle';


export default function PRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Monitoring" element={<LiveFeed />} />
        <Route path="/" element={<Layout />}>
          {/* <Route path="cours" element={<Cours />} /> */}
          <Route path="LiveFeed" element={<LiveFeed />} />
          <Route path="AppUsers" element={<AppUsers />} />
          <Route path="ParkingUsers" element={<ParkingUsers />} />
          <Route path="Sites" element={<Sites />} />
          <Route path="Vehicles" element={<Vehicles />} />
          <Route path="Permissions" element={<Permissions />} />

          <Route path="add-appUser" element={<AddAppUser />} />
          <Route path="add-parkingUser" element={<AddParkingUser />} />
          <Route path="add-permission" element={<AddPermission />} />
          <Route path="add-site" element={<AddSite />} />
          <Route path="add-vehicle" element={<AddVehicle />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
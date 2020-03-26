import React from "react";
import {
  NavLink,
  Route,
  useRouteMatch,
  Switch,
  useParams,
  RouteComponentProps
} from "react-router-dom";

const AdminPage: React.FC = () => {
  const { path, url } = useRouteMatch();
  return (
    <div>
      <div className="page-container">
        <h1>Admin Panel</h1>
        <ul className="admin-section">
          <li key="users">
            <NavLink to={`${url}/users`} activeClassName="admin-link-active">
              {" "}
              Users{" "}
            </NavLink>
          </li>
          <li key="products">
            <NavLink to={`${url}/products`} activeClassName="admin-link-active">
              {" "}
              Products{" "}
            </NavLink>
          </li>
        </ul>
          <Route path={`${path}/users`} component={AdminUsers} />
          <Route path={`${path}/users/:id`} exact component={AdminUser} />
          <Route path={`${path}/products`} component={AdminProducts} />
      </div>
    </div>
  );
};

const AdminProducts: React.SFC = () => {
  return <div>Some options to administer products</div>;
};

interface IUser {
  id: number;
  name: string;
  isAdmin: boolean;
}

const adminUsersData: IUser[] = [
  { id: 1, name: "Fred", isAdmin: true },
  { id: 2, name: "Bob", isAdmin: false },
  { id: 3, name: "Jane", isAdmin: true }
];

const AdminUsers: React.FC = () => {
  const { path, url } = useRouteMatch();
  return (
    <div>
      <ul className="admin-sections">
        {adminUsersData.map(user => (
          <li key={user.id}>
            <NavLink
              to={`${url + "/" + user.id}`}
              activeClassName="admin-link-active"
            >
              {user.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

const AdminUser = (props: RouteComponentProps<{ id: string | undefined }>) => {
  const { id } = useParams();
  if (id) {
    let user = adminUsersData.filter(u => u.id === parseInt(id))[0];
    return (
      <div>
        <div>
          <b>Id: </b>
          <span>{user.id.toString()}</span>
        </div>
        <div>
          <b>Is Admin: </b>
          <span>{user.isAdmin.toString()}</span>
        </div>
      </div>
    );
  }
  return null;
};

export default AdminPage;

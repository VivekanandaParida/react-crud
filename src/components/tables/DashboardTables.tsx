import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import CustomTable from "./customTable/CustomTable";
import classes from "./DashboardTables.module.scss";
// import data from "../../constants/data";
import { useEffect, useState } from "react";
import { userService } from "../../Api/user.services";
import { IUser, userHeader } from "../../interfaces/IUser";

const Table = ({ submitted }: any) => {
const { t } = useTranslation();
const [useTable, setUserTable] = useState<IUser[]>([]);

  useEffect(() => {
    getAllUsers();
  }, [submitted]);

  const getAllUsers = async () => {

    try {
      setUserTable([])
      const response: any = await userService.getAllUsers();
      setUserTable([
        ...response?.data.map((res: IUser) => {
          return {
            // UserId: res.User_Id,
            mobile: res.mobile,
            password: res.password

          }
        })
      ])
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <section className={classes.table}>
      <div
        className={`${classes.table__top__customers} ${classes.table__child}`}
      >
        <div className={classes.table__title}>
          {/* <p className="subTitle">{t("topCustomers")}</p> */}
          <Link to="/">{t("viewAll")}</Link>
        </div>
        <CustomTable
          limit={10}
          headData={userHeader}
          bodyData={useTable}
        />
      </div>
      {/* <div
        className={`${classes.table__latest__orders} ${classes.table__child}`}
      >
        <div className={classes.table__title}>
          <p className="subTitle">{t("latestTransaction")}</p>
          <Link to="/">{t("viewAll")}</Link>
        </div>
        <CustomTable
          headData={useTable.latestOrders.header}
          bodyData={useTable.latestOrders.body}
        />
      </div> */}

    </section>
  );
};

export default Table;

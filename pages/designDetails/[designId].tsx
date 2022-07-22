import React, { useEffect, useState } from "react";
import { sendRequest } from "../../src/hooks/request";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import Link from "next/link";
const DesignDetails = () => {
  const router = useRouter();
  const alert = useAlert();
  const [design, setDesign] = useState<any>({});
  const [user, setUser] = useState<any>({});

  let designId;

  useEffect(() => {
    designId = router.query.designId;
    getSeller(designId);
  }, [designId]);

  const getSeller = async (designId: any) => {
    try {
      const { data } = await sendRequest(
        `${process.env.NEXT_PUBLIC_API_URL}/design/design/${designId}`
      );
      console.log(data);
      setDesign(data.design);
      setUser(data.user)
    } catch (err) {
      console.log(err);
      alert.error("Something went wrong");
    }
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <Link href="/adminSellers" >
        <a href="javascript:history.back()" className="btn btn-light">
          <i className="material-icons md-arrow_back"></i> Go back
        </a>
        </Link>
      </div>

      <div className="card mb-4">
        <div
          className="card-header bg-warning"
          style={{ height: "150px" }}
        ></div>
        <div className="card-body">
          <div className="row">
            <div
              className="col-xl col-lg flex-grow-0"
              style={{ flexBasis: "230px" }}
            ></div>
            {/* <!--  col.// --> */}
            <div className="col-xl col-lg">
              <h3>{design.name}</h3>
              <p>{design.storeName}</p>
            </div>
            {/* <!--  col.// --> */}
    
            {/* <!--  col.// --> */}
          </div>
          {/* <!-- card-body.// --> */}
          <hr className="my-4" />
          <div className="row g-4">
          
            {/* <!--  col.// --> */}
            <div className="col-sm-6 col-lg-4 col-xl-3">
              <h6>Contact</h6>
              <p>{user.name}</p>
              <p>{user.phone},</p>
            </div>
            {/* <!--  col.// --> */}
            <div className="col-sm-6 col-lg-4 col-xl-3">
              <h6>Product Category</h6>
              <p>
                {design.category}
              </p>
            </div>
            <div className="col-sm-6 col-lg-4 col-xl-3">
              <h6>Product Description</h6>
              <p>
                {design.description}
              </p>
            </div>
            {/* <!--  col.// --> */}

            {/* <!--  col.// --> */}
          </div>
          {/* <!--  row.// --> */}
        </div>
        {/* <!--  card-body.// --> */}
      </div>
      {/* <!--  card.// --> */}

      <div className="container mb-4">
      <div className="row">
          <h6>Product Images</h6>
          {design.images && design.images.map((image:any)=>{
              return(
                  <div className="col-4" key={image.url}>
                      <img src={image.url} alt={image.url} />
                  </div>
              );
          })}
      </div>
   
      </div>
      {/* <!--  card.// --> */}
    </section>
  );
};

export default DesignDetails;
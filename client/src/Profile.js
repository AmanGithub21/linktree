import axios from "axios";
import PageNotFound from "./PageNotFound";
import LinktreeListItem from "./LinktreeListItem";
import { Component } from "react";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { tree: [], notFound: false };
  }
  async componentDidMount() {
    const res = await axios.post(
      `http://linktree-ycwe.onrender.com/profile/${this.props.match.params.username}`
    );
    if (res.data === "notfound") this.setState({ notFound: true });
    else this.setState({ tree: res.data.tree });
  }
  render() {
    return (
      <div className="text-center">
        {this.state.notFound ? (
          <PageNotFound />
        ) : (
          <div className=" d-flex justify-content-center">
            <div className="col-lg-6 col-sm-10 col-10">
              <h1>{this.props.match.params.username}</h1>
              {this.state.tree.map((item) => (
                <div className="LinktreeListItem p-2">
                  <LinktreeListItem
                    key={item._id}
                    item={item}
                    homePage={false}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;

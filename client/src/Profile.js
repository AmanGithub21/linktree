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
        const res = await axios.get(
            `http://localhost:8080/profile/${this.props.match.params.username}`
        );
        if (res.data === "notfound") this.setState({ notFound: true });
        else this.setState({ tree: res.data.tree });
    }
    render() {
        return (
            <div className="">
                {this.state.notFound ? (
                    <PageNotFound />
                ) : (
                    <div>
                        {this.state.tree.map((item) => (
                            <LinktreeListItem
                                key={item._id}
                                item={item}
                                homePage={false}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default Profile;

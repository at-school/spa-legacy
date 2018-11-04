import Loadable from "react-loadable";

const Post00001 = Loadable({
  loader: () => import("./Post00001"),
  loading: () => null
});

const Post00002 = Loadable({
  loader: () => import("./Post00002"),
  loading: () => null
});

const Post00003 = Loadable({
  loader: () => import("./Post00003"),
  loading: () => null
});

const Post00004 = Loadable({
  loader: () => import("./Post00004"),
  loading: () => null
});

const Post00005 = Loadable({
  loader: () => import("./Post00005"),
  loading: () => null
});

const Post00006 = Loadable({
  loader: () => import("./Post00006"),
  loading: () => null
});

const Post00007 = Loadable({
  loader: () => import("./Post00007"),
  loading: () => null
});

const Post00008 = Loadable({
  loader: () => import("./Post00008"),
  loading: () => null
});

const Post00009 = Loadable({
  loader: () => import("./Post00009"),
  loading: () => null
});

const Post00010 = Loadable({
  loader: () => import("./Post00010"),
  loading: () => null
});

const Post00011 = Loadable({
	loader: () => import("./Post00011"),
	loading: () => null
  });

const Post00012 = Loadable({
	loader: () => import("./Post00012"),
	loading: () => null
});

const Post00013 = Loadable({
	loader: () => import("./Post00013"),
	loading: () => null
});

export const posts = [
	{
		title: "Week 12 Update",
		author: ["Anh Pham, ", "Charl Kruger"],
		date: "4 November 2018",
		postId: "00013",
		component: Post00013
	},
	{
		title: "Week 11 Update",
		author: ["Anh Pham, ", "Charl Kruger"],
		date: "27 October 2018",
		postId: "00012",
		component: Post00012
	},
	{
		title: "Week 10 Update",
		author: ["Anh Pham, ", "Charl Kruger"],
		date: "21 October 2018",
		postId: "00011",
		component: Post00011
	},
  {
    title: "Week 9 Update",
    author: ["Anh Pham, ", "Charl Kruger"],
    date: "13 October 2018",
    postId: "00010",
    component: Post00010
  },
  {
    title: "Week 8 Update",
    author: ["Anh Pham, ", "Charl Kruger"],
    date: "7 October 2018",
    postId: "00009",
    component: Post00009
  },
  {
    title: "Week 7 Update",
    author: ["Anh Pham, ", "Charl Kruger"],
    date: "29 September 2018",
    postId: "00008",
    component: Post00008
  },
  {
    title: "Week 6 Update",
    author: ["Anh Pham, ", "Charl Kruger"],
    date: "22 September 2018",
    postId: "00007",
    component: Post00007
  },
  {
    title: "Week 5 Update",
    author: ["Anh Pham, ", "Charl Kruger"],
    date: "16 September 2018",
    postId: "00006",
    component: Post00006
  },
  {
    title: "Week 4 Update",
    author: ["Anh Pham, ", "Charl Kruger"],
    date: "09 September 2018",
    postId: "00005",
    component: Post00005
  },
  {
    title: "Week 3 Update",
    author: ["Anh Pham, ", "Charl Kruger"],
    date: "01 September 2018",
    postId: "00004",
    component: Post00004
  },
  {
    title: "Week 2 Update",
    author: ["Anh Pham, ", "Charl Kruger"],
    date: "24 August 2018",
    postId: "00003",
    component: Post00003
  },
  {
    title: "Week 1 Update",
    author: ["Anh Pham, ", "Charl Kruger"],
    date: "17 August 2018",
    postId: "00002",
    component: Post00002
  },
  {
    title: "Project Planning",
    author: ["Anh Pham, ", "Charl Kruger"],
    date: "12 August 2018",
    postId: "00001",
    component: Post00001
  }
];

import { pool } from "../database.js";

export const renderAddLink = (req, res) => res.render("links/add");

export const addLink = async (req, res) => {
  const { title, url, description } = req.body;
  await pool.query("INSERT INTO links set ?", [
    {
      title,
      url,
      description,
      user_id: req.user.id,
    },
  ]);
  await req.setFlash("success", "Link Saved Successfully");
  res.redirect("/links");
};

export const renderLinks = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM links WHERE user_id = ?", [
    req.user.id,
  ]);
  res.render("links/list", { links: rows });
};

export const deleteLink = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM links WHERE ID = ?", [id]);
  await req.setFlash("success", `Link ${id} Removed Successfully`);
  return res.redirect("/links");
};

export const renderEditLink = async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query("SELECT * FROM links WHERE id = ?", [id]);
  res.render("links/edit", { link: rows[0] });
};

export const editLink = async (req, res) => {
  const { id } = req.params;
  const { title, description, url } = req.body;
  const newLink = {
    title,
    description,
    url,
  };
  await pool.query("UPDATE links set ? WHERE id = ?", [newLink, id]);
  await req.setFlash("success", "Link Updated Successfully");
  res.redirect("/links");
};

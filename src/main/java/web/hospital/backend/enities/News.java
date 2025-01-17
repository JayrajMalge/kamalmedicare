/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package web.hospital.backend.enities;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.NamedQueries;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.io.Serializable;
import java.util.Date;

/**
 *
 * @author Jayraj Malge
 */
@Entity
@Table(name = "news")
@NamedQueries({
    @NamedQuery(name = "News.findAll", query = "SELECT n FROM News n"),
    @NamedQuery(name = "News.findByNewsid", query = "SELECT n FROM News n WHERE n.newsid = :newsid"),
    @NamedQuery(name = "News.findByTittle", query = "SELECT n FROM News n WHERE n.tittle = :tittle"),
    @NamedQuery(name = "News.findByNewsdate", query = "SELECT n FROM News n WHERE n.newsdate = :newsdate")})
public class News implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "newsid")
    private Integer newsid;
    @Column(name = "tittle")
    private String tittle;
    @Lob
    @Column(name = "description")
    private String description;
    @Column(name = "newsdate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date newsdate;

    public News() {
    }

    public News(Integer newsid) {
        this.newsid = newsid;
    }

    public Integer getNewsid() {
        return newsid;
    }

    public void setNewsid(Integer newsid) {
        this.newsid = newsid;
    }

    public String getTittle() {
        return tittle;
    }

    public void setTittle(String tittle) {
        this.tittle = tittle;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getNewsdate() {
        return newsdate;
    }

    public void setNewsdate(Date newsdate) {
        this.newsdate = newsdate;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (newsid != null ? newsid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof News)) {
            return false;
        }
        News other = (News) object;
        if ((this.newsid == null && other.newsid != null) || (this.newsid != null && !this.newsid.equals(other.newsid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "web.hospital.backend.enities.News[ newsid=" + newsid + " ]";
    }
    
}

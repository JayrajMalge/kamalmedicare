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
@Table(name = "page")
@NamedQueries({
    @NamedQuery(name = "Page.findAll", query = "SELECT p FROM Page p"),
    @NamedQuery(name = "Page.findByPageid", query = "SELECT p FROM Page p WHERE p.pageid = :pageid"),
    @NamedQuery(name = "Page.findByTittle", query = "SELECT p FROM Page p WHERE p.tittle = :tittle"),
    @NamedQuery(name = "Page.findByDescription", query = "SELECT p FROM Page p WHERE p.description = :description"),
    @NamedQuery(name = "Page.findBySlug", query = "SELECT p FROM Page p WHERE p.slug = :slug"),
    @NamedQuery(name = "Page.findByCreateat", query = "SELECT p FROM Page p WHERE p.createat = :createat"),
    @NamedQuery(name = "Page.findByUpdateat", query = "SELECT p FROM Page p WHERE p.updateat = :updateat")})
public class Page implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "pageid")
    private Integer pageid;
    @Column(name = "tittle")
    private String tittle;
    @Column(name = "description")
    private String description;
    @Column(name = "slug")
    private String slug;
    @Column(name = "createat")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createat;
    @Column(name = "updateat")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateat;

    public Page() {
    }

    public Page(Integer pageid) {
        this.pageid = pageid;
    }

    public Integer getPageid() {
        return pageid;
    }

    public void setPageid(Integer pageid) {
        this.pageid = pageid;
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

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public Date getCreateat() {
        return createat;
    }

    public void setCreateat(Date createat) {
        this.createat = createat;
    }

    public Date getUpdateat() {
        return updateat;
    }

    public void setUpdateat(Date updateat) {
        this.updateat = updateat;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (pageid != null ? pageid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Page)) {
            return false;
        }
        Page other = (Page) object;
        if ((this.pageid == null && other.pageid != null) || (this.pageid != null && !this.pageid.equals(other.pageid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "web.hospital.backend.enities.Page[ pageid=" + pageid + " ]";
    }
    
}

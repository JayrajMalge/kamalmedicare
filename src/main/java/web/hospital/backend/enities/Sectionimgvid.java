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
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.util.List;

/**
 *
 * @author Jayraj Malge
 */
@Entity
@Table(name = "sectionimgvid")
@NamedQueries({
    @NamedQuery(name = "Sectionimgvid.findAll", query = "SELECT s FROM Sectionimgvid s"),
    @NamedQuery(name = "Sectionimgvid.findBySectionimgid", query = "SELECT s FROM Sectionimgvid s WHERE s.sectionimgid = :sectionimgid")})
public class Sectionimgvid implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "sectionimgid")
    private Integer sectionimgid;
    @Lob
    @Column(name = "imgdata")
    private byte[] imgdata;
    @Lob
    @Column(name = "viddata")
    private byte[] viddata;
    @OneToMany(mappedBy = "sectionmedia")
    private List<Section> sectionList;

    public Sectionimgvid() {
    }

    public Sectionimgvid(Integer sectionimgid) {
        this.sectionimgid = sectionimgid;
    }

    public Integer getSectionimgid() {
        return sectionimgid;
    }

    public void setSectionimgid(Integer sectionimgid) {
        this.sectionimgid = sectionimgid;
    }

    public byte[] getImgdata() {
        return imgdata;
    }

    public void setImgdata(byte[] imgdata) {
        this.imgdata = imgdata;
    }

    public byte[] getViddata() {
        return viddata;
    }

    public void setViddata(byte[] viddata) {
        this.viddata = viddata;
    }

    public List<Section> getSectionList() {
        return sectionList;
    }

    public void setSectionList(List<Section> sectionList) {
        this.sectionList = sectionList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (sectionimgid != null ? sectionimgid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Sectionimgvid)) {
            return false;
        }
        Sectionimgvid other = (Sectionimgvid) object;
        if ((this.sectionimgid == null && other.sectionimgid != null) || (this.sectionimgid != null && !this.sectionimgid.equals(other.sectionimgid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "web.hospital.backend.enities.Sectionimgvid[ sectionimgid=" + sectionimgid + " ]";
    }
    
}

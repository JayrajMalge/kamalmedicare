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
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "experience")
@NamedQueries({
    @NamedQuery(name = "Experience.findAll", query = "SELECT e FROM Experience e"),
    @NamedQuery(name = "Experience.findByExperienceId", query = "SELECT e FROM Experience e WHERE e.experienceId = :experienceId"),
    @NamedQuery(name = "Experience.findByField", query = "SELECT e FROM Experience e WHERE e.field = :field"),
    @NamedQuery(name = "Experience.findByHospitalname", query = "SELECT e FROM Experience e WHERE e.hospitalname = :hospitalname"),
    @NamedQuery(name = "Experience.findByYears", query = "SELECT e FROM Experience e WHERE e.years = :years"),
    @NamedQuery(name = "Experience.findByFromdate", query = "SELECT e FROM Experience e WHERE e.fromdate = :fromdate"),
    @NamedQuery(name = "Experience.findByTodate", query = "SELECT e FROM Experience e WHERE e.todate = :todate")})
public class Experience implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "experience_id")
    private Integer experienceId;
    @Column(name = "field")
    private String field;
    @Column(name = "hospitalname")
    private String hospitalname;
    @Column(name = "years")
    private Integer years;
    @Column(name = "fromdate")
    @Temporal(TemporalType.DATE)
    private Date fromdate;
    @Column(name = "todate")
    @Temporal(TemporalType.DATE)
    private Date todate;
    @JoinColumn(name = "doctor", referencedColumnName = "doctorid")
    @ManyToOne
    private Doctor doctor;

    public Experience() {
    }

    public Experience(Integer experienceId) {
        this.experienceId = experienceId;
    }

    public Integer getExperienceId() {
        return experienceId;
    }

    public void setExperienceId(Integer experienceId) {
        this.experienceId = experienceId;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getHospitalname() {
        return hospitalname;
    }

    public void setHospitalname(String hospitalname) {
        this.hospitalname = hospitalname;
    }

    public Integer getYears() {
        return years;
    }

    public void setYears(Integer years) {
        this.years = years;
    }

    public Date getFromdate() {
        return fromdate;
    }

    public void setFromdate(Date fromdate) {
        this.fromdate = fromdate;
    }

    public Date getTodate() {
        return todate;
    }

    public void setTodate(Date todate) {
        this.todate = todate;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (experienceId != null ? experienceId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Experience)) {
            return false;
        }
        Experience other = (Experience) object;
        if ((this.experienceId == null && other.experienceId != null) || (this.experienceId != null && !this.experienceId.equals(other.experienceId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "web.hospital.backend.enities.Experience[ experienceId=" + experienceId + " ]";
    }
    
}
